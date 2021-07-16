import { useState, useEffect } from 'react';
import { useTheme } from '../../App';
import { Route, useHistory } from 'react-router-dom';
import { SideBar, SideBarItem } from './SideBar';
import { Loading } from '../Loading';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { LoginRedirect } from '../Login';
import { DashboardSection } from './DashboardSection-TeacherPage';
import { HomeworkSection } from './HomeworkSection-TeacherPage';
import { StudentsSection } from './StudentsSection-TeacherPage';
import { DelayedRedirect } from '../DelayedRedirect';
import { ReactComponent as DashboardIcon } from '../../images/dashboard.svg';
import { ReactComponent as HomeworkIcon } from '../../images/homework.svg';
import { ReactComponent as StudentsIcon } from '../../images/students.svg';
import '../../styles/TeacherPage/TeacherPage.css';
import * as Api from '../../Api';

const TeacherPage = ({ token, setToken, darkMode, setDarkMode, snowflakes, setSnowflakes }) => {
    // TODO code, design: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903173443604/IMG_20210427_120223.jpg

    // TODO design: make page responsive

    const [currentState, setCurrentState] = useState('Loading');
    const [needsSidebar, setNeedsSidebar] = useState(false);
    const [redirect, setRedirect] = useState(null);
    const history = useHistory();

    const redirectTo = (path) => {
        console.log(`redirecting to ${path.toLowerCase()}`)
        setRedirect(<DelayedRedirect to={ `/teacher/${path.toLowerCase()}` } />);
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

        fetchUserType();
    }, [setToken, token]);

    useEffect(() => {
        history.listen((location) => {
            setCurrentState('ok');

            for (let value of ['dashboard', 'homework', 'students']) {
                if (location.pathname.toString().includes(value)) {
                    setNeedsSidebar(true)
                    return;
                }
            }

            setNeedsSidebar(false);
        });
    }, [history]);

    useEffect(() => {
        redirectTo('');
    }, []);

    const teacherPageClassName = useTheme('teacher-page');

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
                <SideBarItem icon={ <DashboardIcon /> } name='Dashboard' onClick={ redirectTo } />
                <SideBarItem icon={ <HomeworkIcon /> } name='Homework' onClick={ redirectTo } />
                <SideBarItem icon={ <StudentsIcon /> } name='Students' onClick={ redirectTo } />
            </SideBar> }

            { currentState === 'Loading' && <Loading /> }
            { currentState === 'SomethingWentWrong' && <SomethingWentWrong h2MarginTop='-1rem' /> }

            { currentState === 'ok' &&
            <div className='content-container'>
                <Route path='/teacher/uhavenopowerhere' exact={ true }>
                    <SomethingWentWrong h1Text='Uhh... Are you sure you should be here?' h2FontSize='2.5rem'
                        h2Text={ [`It looks like you don't have permission to view this site,`, <br />, `if you think you should, please contact us on:`] } />
                </Route>

                <Route path='/teacher/dashboard' exact={ false }>
                    <div className='content'>
                        <DashboardSection
                            token={ token }
                        />
                    </div>
                </Route>

                <Route path='/teacher/homework' exact={ false }>
                    <div className='content'>
                        <HomeworkSection
                            token={ token }
                        />
                    </div>
                </Route>

                <Route path='/teacher/students' exact={ false }>
                    <div className='content'>
                        <StudentsSection
                            token={ token }
                        />
                    </div>
                </Route>

                <Route path='/teacher' exact={ true }>
                    <DelayedRedirect to='/teacher/dashboard' />
                </Route>
            </div> }
        </div>
    )
}

export { TeacherPage };
