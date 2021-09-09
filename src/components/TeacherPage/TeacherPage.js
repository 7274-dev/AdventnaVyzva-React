import { useState, useEffect } from 'react';
import { useTheme } from '../../App';
import { useResponsiveValue } from '../../hooks/useResponsiveValue';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Loading } from '../Loading';
import { SomethingWentWrong } from '../SomethingWentWrong';
import {
    DashboardSection,
    HomeworkSection, HomeworkCard,
    StudentsSection,
    SideBar, SideBarItem
} from '.';
import { LoginRedirect } from '../Login';
import { DelayedRedirect } from '../DelayedRedirect';
import { redirectMeTo } from '../RedirectMeTo';
import * as Api from '../../api';
import DashboardIcon from '../../images/dashboard.png';
import HomeworkIcon from '../../images/homework.png';
import StudentsIcon from '../../images/students.png';
import '../../styles/TeacherPage/TeacherPage.css';
import { localized } from '../../hooks/useLocalization';

const TeacherPage = ({ token, setToken, darkMode, setDarkMode, snowflakes, setSnowflakes }) => {
    // TODO code, design: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903173443604/IMG_20210427_120223.jpg

    // TODO design: check for responsibility
    // TODO code, design: settings switch is bugged

    const [currentState, setCurrentState] = useState('Loading');
    const [needsSidebar, setNeedsSidebar] = useState(false);
    const history = useHistory();

    const redirectTo = (path) => {
        redirectMeTo(`/teacher/${path.toLowerCase()}`);
    }

    const backToHomePage = () => {
        redirectMeTo('/');
    }

    useEffect(() => {
        const fetchUserType = async () => {
            const response = await Api.utils.getUserType(token).catch(() => {
                redirectMeTo('/serverisdown');
            });
            const fetchedUserType = (await response.json()).response;

            if (response.status === 200 && ['admin', 'teacher'].includes(fetchedUserType)) {
                setCurrentState('ok');
            }
            else if (fetchedUserType === 'student') {
                redirectTo('UHaveNoPowerHere');
            }
            else if (fetchedUserType === 'Bad token') {
                // token is not working (user needs to login again)
                setToken(undefined);
            }
            else {
                setCurrentState('SomethingWentWrong');
            }
        };

        setTimeout(() => {
            fetchUserType().catch(() => {
                setCurrentState('SomethingWentWrong');

                // checks every 2 seconds if the problem isn't fixed
                const intervalID = setInterval(() => {
                    fetchUserType().then(() => clearInterval(intervalID));
                }, 2000);
            });
        }, 500);
    }, [setToken, token]);

    useEffect(() => {
        setTimeout(() => {
            const locationChangeCallback = (location) => {
                setCurrentState('ok');

                for (const value of ['dashboard', 'homework', 'students']) {
                    if (location.pathname.toString().toLowerCase().includes(value)) {
                        setNeedsSidebar(true);
                        return;
                    }
                }

                setNeedsSidebar(false);
            }

            history.listen(locationChangeCallback);
            locationChangeCallback(window.location);
        }, 500);
    }, [history]);

    const teacherPageClassName = useTheme('teacher-page');
    const backToHomePageButtonClassName = useTheme('back-to-home-page-button');
    const isMobile = useResponsiveValue(false, true, true);
    const contentClassName = isMobile ? 'content-mobile' : 'content';

    if (['undefined', undefined].includes(token)) {
        return (
            <LoginRedirect />
        )
    }

    return (
        <div className={ teacherPageClassName } >
            { needsSidebar &&
            <SideBar token={ token } darkMode={ darkMode } setDarkMode={ setDarkMode }
                     snowflakes={ snowflakes } setSnowflakes={ setSnowflakes }>
                <SideBarItem
                    icon={ <img src={ DashboardIcon }
                    alt={ localized('dashboard') } /> }
                    name={ localized('dashboard') }
                    onClick={() => redirectTo('dashboard')}
                />
                <SideBarItem
                    icon={ <img src={ HomeworkIcon }
                    alt={ localized('homework') } /> }
                    name={ localized('homework') }
                    onClick={() => redirectTo('homework')}
                />
                <SideBarItem
                    icon={ <img src={ StudentsIcon }
                    alt={ localized('students') } /> }
                    name={ localized('students') }
                    onClick={() => redirectTo('students')}
                />
            </SideBar> }

            { currentState === 'Loading' && <Loading /> }
            { currentState === 'SomethingWentWrong' && <SomethingWentWrong h2MarginTop='-1rem' /> }

            { currentState === 'ok' &&
            <div className='content-container'>
                <Switch>
                    <Route path='/teacher/uhavenopowerhere' exact>
                        <SomethingWentWrong
                            h1Text={ localized('easter.egg.1') } h2FontSize='2.5rem'
                            h2Text={ [localized('easter.egg.2.1'), <br />, localized('easter.egg.2.2')] }
                        />

                        <button className={ backToHomePageButtonClassName } onClick={ backToHomePage }>{ localized('back.to.home') }</button>
                    </Route>

                    <Route path='/teacher/dashboard' exact>
                        <div className={ contentClassName }>
                            <DashboardSection
                                token={ token }
                            />
                        </div>
                    </Route>

                    <Route path='/teacher/homework' exact>
                        <div className={ contentClassName }>
                            <HomeworkSection
                                token={ token }
                            />
                        </div>
                    </Route>

                    <Route path='/teacher/homework/:homeworkId' exact>
                        <div className={ contentClassName }>
                            <HomeworkCard
                                token={ token }
                            />
                        </div>
                    </Route>

                    <Route path='/teacher/students' exact>
                        <div className={ contentClassName }>
                            <StudentsSection
                                token={ token }
                            />
                        </div>
                    </Route>

                    <Route path='/teacher'>
                        <DelayedRedirect to='/teacher/dashboard' />
                    </Route>

                    <Route>
                        <DelayedRedirect to='/teacher' />
                    </Route>
                </Switch>
            </div> }
        </div>
    )
}

export { TeacherPage };
