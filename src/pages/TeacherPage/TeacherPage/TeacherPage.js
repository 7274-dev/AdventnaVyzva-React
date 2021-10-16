import { useState, useEffect } from 'react';
import { useTheme } from '../../../App';
import { useResponsiveValue } from '../../../hooks/useResponsiveValue';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Loading } from '../../../components';
import { SomethingWentWrong } from '../../../components';
import {
    DashboardSection,
    HomeworkSection, HomeworkCard,
    StudentsSection,
    Sidebar, SideBarItem
} from '../index';
import { LoginRedirect } from '../../Login/Login';
import { DelayedRedirect } from '../../../components';
import { redirectMeTo } from '../../../components';
import { localized } from '../../../hooks/useLocalization';
import * as Api from '../../../api';
import DashboardIcon from '../../../images/dashboard.png';
import HomeworkIcon from '../../../images/homework.png';
import StudentsIcon from '../../../images/students.png';
import '../../../styles/TeacherPage/TeacherPage.css';

const TeacherPage = ({ token, setToken }) => {
    // TODO code, design: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903173443604/IMG_20210427_120223.jpg

    // TODO design: check for responsibility

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
        }

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
            <Sidebar>
                <SideBarItem
                    icon={ <img src={ DashboardIcon }
                    alt={ localized('teacherPage.dashboard') } /> }
                    name={ localized('teacherPage.dashboard') }
                    onClick={() => redirectTo('dashboard')}
                />
                <SideBarItem
                    icon={ <img src={ HomeworkIcon }
                    alt={ localized('teacherPage.homework') } /> }
                    name={ localized('teacherPage.homework') }
                    onClick={() => redirectTo('homework')}
                />
                <SideBarItem
                    icon={ <img src={ StudentsIcon }
                    alt={ localized('teacherPage.students') } /> }
                    name={ localized('teacherPage.students') }
                    onClick={() => redirectTo('students')}
                />
            </Sidebar> }

            { currentState === 'Loading' && <Loading /> }
            { currentState === 'SomethingWentWrong' && <SomethingWentWrong h2MarginTop='-1rem' /> }

            { currentState === 'ok' &&
            <div className='content-container'>
                <Switch>
                    <Route path='/teacher/uhavenopowerhere' exact>
                        <SomethingWentWrong
                            h1Text={ localized('uhavenopowerhere.title') } h2FontSize='2.5rem'
                            h2Text={ [localized('uhavenopowerhere.text1'), <br />, localized('uhavenopowerhere.text2'), ':'] }
                        />

                        <button className={ backToHomePageButtonClassName } onClick={ backToHomePage }>{ localized('uhavenopowerhere.backToHomePage') }</button>
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

export { TeacherPage }
