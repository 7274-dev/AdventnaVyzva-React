import { useState, useEffect } from 'react';
import { useTheme } from '../../App';
import { useResponsiveValue } from '../../hooks/useResponsiveValue';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Loading } from '../Loading';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { DashboardSection } from './DashboardSection-TeacherPage';
import { HomeworkSection, HomeworkCard } from './HomeworkSection-TeacherPage';
import { StudentsSection, StudentsCard } from './StudentsSection-TeacherPage';
import { SideBar, SideBarItem } from './SideBar';
import { LoginRedirect } from '../Login';
import { DelayedRedirect } from '../DelayedRedirect';
import * as Api from '../../Api';
import DashboardIcon from '../../images/dashboard.png';
import HomeworkIcon from '../../images/homework.png';
import StudentsIcon from '../../images/students.png';
import '../../styles/TeacherPage/TeacherPage.css';

const TeacherPage = ({ token, setToken, darkMode, setDarkMode, snowflakes, setSnowflakes }) => {
    // TODO code, design: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903173443604/IMG_20210427_120223.jpg

    // TODO design: when height is over 100vh background is white

    const [currentState, setCurrentState] = useState('Loading');
    const [needsSidebar, setNeedsSidebar] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const history = useHistory();

    const redirectTo = (path) => {
        setRedirect(<DelayedRedirect to={ `/teacher/${path.toLowerCase()}` } />);
    }

    const backToHomePage = () => {
        setRedirect(<DelayedRedirect to={ '/' } />);
    }

    useEffect(() => {
        const fetchUserType = async () => {
            const response = await Api.getUserType(token);
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
            fetchUserType().catch(err => {
                setCurrentState('SomethingWentWrong');

                // checks every 2 seconds if the problem isn't fixed
                const intervalID = setInterval(() => {
                    fetchUserType().then(r => clearInterval(intervalID));
                }, 2000);
            });
        }, 500);
    }, [setToken, token]);

    useEffect(() => {
        setTimeout(() => {
            const locationChangeCallback = (location) => {
                setCurrentState('ok');

                for (let value of ['dashboard', 'homework', 'students']) {
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
            { redirect !== null && redirect }

            { needsSidebar &&
            <SideBar token={ token } darkMode={ darkMode } setDarkMode={ setDarkMode }
                     snowflakes={ snowflakes } setSnowflakes={ setSnowflakes }>
                <SideBarItem icon={ <img src={ DashboardIcon } alt='Dashboard' /> } name='Dashboard' onClick={ redirectTo } />
                <SideBarItem icon={ <img src={ HomeworkIcon } alt='Homework' /> } name='Homework' onClick={ redirectTo } />
                <SideBarItem icon={ <img src={ StudentsIcon } alt='Students' /> } name='Students' onClick={ redirectTo } />
            </SideBar> }

            { currentState === 'Loading' && <Loading /> }
            { currentState === 'SomethingWentWrong' && <SomethingWentWrong h2MarginTop='-1rem' /> }

            { currentState === 'ok' &&
            <div className='content-container'>
                <Switch>
                    <Route path='/teacher/uhavenopowerhere' exact>
                        <SomethingWentWrong
                            h1Text='Uhh... Are you sure you should be here?' h2FontSize='2.5rem'
                            h2Text={ [`It looks like you don't have permission to view this site,`, <br />, `if you think you should, please contact us on:`] }
                        />

                        <button className={ backToHomePageButtonClassName } onClick={ backToHomePage }>Back To Home Page</button>
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

                    <Route path='/teacher/students/:studentId' exact>
                        <div className={ contentClassName }>
                            <StudentsCard
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
