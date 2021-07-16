import { useState } from 'react';
import { useTheme } from '../../App';
import { SideBar, SideBarItem } from './SideBar';
import { StudentsSection } from './StudentsSection-TeacherPage';
import { DashboardSection } from './DashboardSection-TeacherPage';
import { HomeworkSection } from './HomeworkSection-TeacherPage';
import { ReactComponent as DashboardIcon } from '../../images/dashboard.svg';
import { ReactComponent as HomeworkIcon } from '../../images/homework.svg';
import { ReactComponent as StudentsIcon } from '../../images/students.svg';
import '../../styles/TeacherPage/TeacherPage.css';

const TeacherPage = ({ token, darkMode, setDarkMode, snowflakes, setSnowflakes }) => {
    // TODO code, design: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903173443604/IMG_20210427_120223.jpg

    // TODO design: make page responsive

    const [currentPage, setCurrentPage] = useState('dashboard');

    const changeCurrentPage = (name) => {
        setCurrentPage(name.toLowerCase());
    }

    const teacherPageClassName = useTheme('teacher-page');

    return (
        <div className={ teacherPageClassName } >
            <SideBar token={ token } darkMode={ darkMode } setDarkMode={ setDarkMode }
                     snowflakes={ snowflakes } setSnowflakes={ setSnowflakes } currentPage={ currentPage }>
                <SideBarItem icon={ <DashboardIcon /> } name='Dashboard' onClick={ changeCurrentPage } />
                <SideBarItem icon={ <HomeworkIcon /> } name='Homework' onClick={ changeCurrentPage } />
                <SideBarItem icon={ <StudentsIcon /> } name='Students' onClick={ changeCurrentPage } />
            </SideBar>

            <div className='content'>
                { currentPage === 'dashboard' && <DashboardSection token={ token } /> }
                { currentPage === 'homework' && <HomeworkSection token={ token } /> }
                { currentPage === 'students' && <StudentsSection token={ token } /> }
            </div>
        </div>
    )
}

export { TeacherPage };
