import { useState, useEffect } from 'react';
import { useTheme } from '../../../App';
import { useResponsiveValue } from '../../../hooks/useResponsiveValue';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Loading, SomethingWentWrong, BackToHomePageButton } from '../../../components';
import {
    DashboardSection,
    HomeworkSection, NewHomework, HomeworkCard,
    StudentsSection, NewStudent,
    ClassesSection, NewClass, ClassCard,
    Sidebar, SidebarItem, StudentsCard
} from '..';
import { DelayedRedirect } from '../../../components';
import { redirectMeTo } from '../../../components';
import { localized } from '../../../hooks/useLocalization';
import * as Api from '../../../api';
import DashboardIcon from '../../../images/dashboard.png';
import HomeworkIcon from '../../../images/homework.png';
import StudentsIcon from '../../../images/students.png';
import ClassIcon from '../../../images/class.png';
import './TeacherPage.css';

const TeacherPage = ({ token, setToken }) => {
    // TODO code, design: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903173443604/IMG_20210427_120223.jpg

    // TODO design: check for responsibility

    const [currentState, setCurrentState] = useState('');
    const [needsSidebar, setNeedsSidebar] = useState(false);
    const history = useHistory();

    const redirectTo = (path) => {
        redirectMeTo(`/teacher/${path.toLowerCase()}`);
    }

    useEffect(() => {
        const fetchUserType = async () => {
            const response = await Api.utils.getUserType(token);
            const fetchedUserType = (await response.json()).response;

            if (response.status === 200 && ['admin', 'teacher'].includes(fetchedUserType)) {
                setCurrentState('ok');
            }
            else if (fetchedUserType === 'student') {
                redirectTo('UHaveNoPowerHere');
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

                for (const value of ['dashboard', 'homework', 'student', 'class']) {
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
    const isMobile = useResponsiveValue(false, true, true);
    const contentClassName = isMobile ? 'content-mobile' : 'content';

    if (['undefined', undefined].includes(token)) {
        redirectMeTo('/');
        return null;
    }

    return (
        <div className={ teacherPageClassName } >
            { needsSidebar &&
            <Sidebar>
                <SidebarItem
                    icon={ <img src={ DashboardIcon } alt={ localized('teacherPage.dashboard') } title={ localized('teacherPage.dashboard') } /> }
                    name={ localized('teacherPage.dashboard') }
                    onClick={() => redirectTo('dashboard')}
                />
                <SidebarItem
                    icon={ <img src={ HomeworkIcon } alt={ localized('teacherPage.homework') } title={ localized('teacherPage.homework') } /> }
                    name={ localized('teacherPage.homework') }
                    onClick={() => redirectTo('homework')}
                />
                <SidebarItem
                    icon={ <img src={ StudentsIcon } alt={ localized('teacherPage.students') } title={ localized('teacherPage.students') } /> }
                    name={ localized('teacherPage.students') }
                    onClick={() => redirectTo('students')}
                />
                <SidebarItem
                    icon={ <img src={ ClassIcon } alt={ localized('teacherPage.classes') } title={ localized('teacherPage.classes') } /> }
                    name={ localized('teacherPage.classes') }
                    onClick={() => redirectTo('classes')}
                />
            </Sidebar> }

            { currentState === '' && <Loading /> }
            { currentState === 'SomethingWentWrong' && <SomethingWentWrong h2MarginTop='-1rem' /> }

            { currentState === 'ok' &&
            <div className='content-container'>
                <Switch>
                    <Route path='/teacher/uhavenopowerhere' exact>
                        <SomethingWentWrong
                            h1Text={ localized('uhavenopowerhere.title') } h2FontSize='2.5rem'
                            h2Text={ [localized('uhavenopowerhere.text1'), <br />, localized('uhavenopowerhere.text2')] }
                        />

                        <BackToHomePageButton />
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

                    <Route path='/teacher/homework/new' exact>
                        <div className={ contentClassName }>
                            <NewHomework
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

                    <Route path='/teacher/student/new' exact>
                        <div className={ contentClassName }>
                            <NewStudent
                                token={ token }
                            />
                        </div>
                    </Route>

                    <Route path='/teacher/student/:studentId' exact>
                        <div className={ contentClassName }>
                            <StudentsCard
                                token={ token }
                            />
                        </div>
                    </Route>

                    <Route path='/teacher/classes' exact>
                        <div className={ contentClassName }>
                            <ClassesSection
                                token={ token }
                            />
                        </div>
                    </Route>

                    <Route path='/teacher/classes/new' exact>
                        <div className={ contentClassName }>
                            <NewClass
                                token={ token }
                            />
                        </div>
                    </Route>

                    <Route path='/teacher/classes/:classId' exact>
                        <div className={ contentClassName }>
                            <ClassCard
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
