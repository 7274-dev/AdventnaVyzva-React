import { useState, useEffect } from 'react';
import { useTheme } from '../../App';
import { SideBar, SideBarItem } from './SideBar';
import { Loading } from '../Loading';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { LoginRedirect } from '../Login';
import { DashboardSection } from './DashboardSection-TeacherPage';
import { HomeworkSection } from './HomeworkSection-TeacherPage';
import { StudentsSection } from './StudentsSection-TeacherPage';
import { ReactComponent as DashboardIcon } from '../../images/dashboard.svg';
import { ReactComponent as HomeworkIcon } from '../../images/homework.svg';
import { ReactComponent as StudentsIcon } from '../../images/students.svg';
import '../../styles/TeacherPage/TeacherPage.css';
import * as Api from '../../Api';

const TeacherPage = ({ token, setToken, darkMode, setDarkMode, snowflakes, setSnowflakes }) => {
    // TODO code, design: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903173443604/IMG_20210427_120223.jpg

    // TODO design: make page responsive
    // TODO code: add token checking (so students don't get here)

    const [currentPage, setCurrentPage] = useState('Loading');

    const changeCurrentPage = (name) => {
        setCurrentPage(name);
    }

    const teacherPageClassName = useTheme('teacher-page');

    useEffect(() => {
        const fetchUserType = async () => {
            const response = await Api.getUserType(token);
            const fetchedUserType = (await response.json()).response

            if (response.status === 200 && ['admin', 'teacher'].includes(fetchedUserType)) {
                setCurrentPage('Dashboard');
            }
            else if (fetchedUserType === 'student') {
                // TODO code: make UHaveNoPowerHere component
                setCurrentPage('');
            }
            else if (fetchedUserType === 'Bad token') {
                // token is not working (user needs to login again)
                setToken(undefined);
            }
            else {
                setCurrentPage('SomethingWentWrong');
            }
        };

        fetchUserType();
    }, [setToken, token]);

    if (['undefined', undefined].includes(token)) {
        return (
            <LoginRedirect />
        )
    }

    return (
        <div className={ teacherPageClassName } >
            { ['Dashboard', 'Homework', 'Students'].includes(currentPage) &&
            <SideBar token={ token } darkMode={ darkMode } setDarkMode={ setDarkMode }
                     snowflakes={ snowflakes } setSnowflakes={ setSnowflakes } currentPage={ currentPage }>
                <SideBarItem icon={ <DashboardIcon /> } name='Dashboard' onClick={ changeCurrentPage } />
                <SideBarItem icon={ <HomeworkIcon /> } name='Homework' onClick={ changeCurrentPage } />
                <SideBarItem icon={ <StudentsIcon /> } name='Students' onClick={ changeCurrentPage } />
            </SideBar> }

            <div className='content'>
                { currentPage === 'Loading' && <Loading /> }
                { currentPage === 'SomethingWentWrong' && <SomethingWentWrong h2MarginTop='-1rem' /> }

                { currentPage === 'Dashboard' && <DashboardSection token={ token } /> }
                { currentPage === 'Homework' && <HomeworkSection token={ token } /> }
                { currentPage === 'Students' && <StudentsSection token={ token } /> }
            </div>
        </div>
    )
}

export { TeacherPage };
