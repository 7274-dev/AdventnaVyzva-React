import { useState } from 'react';
import { SideBar, SideBarItem } from "./SideBar";
import { ReactComponent as DashboardIcon } from '../images/dashboard.svg';
import { ReactComponent as HomeworkIcon } from '../images/homework.svg';
import { ReactComponent as StudentsIcon } from '../images/students.svg';
import '../styles/TeacherPage.css';
import '../styles/Settings.css';

const Dashboard = () => {
    return (
        <div>
            <h1 className="current-page-title">
                Dashboard
            </h1>
        </div>
    )
}

const Homework = () => {
    return (
        <div>
            <h1 className="current-page-title">
                Homework
            </h1>
        </div>
    )
}

const Students = () => {
    return (
        <div>
            <h1 className="current-page-title">
                Students
            </h1>
        </div>
    )
}

const TeacherPage = ({ token, darkMode, setDarkMode, snowFlakes, setSnowFlakes }) => {
    // TODO code, design: finish this page
    // Scratch: https://cdn.discordapp.com/attachments/833685192249442315/836575903173443604/IMG_20210427_120223.jpg
    
    // pretty cluttered in my opinion. it should be simpler  // who wrote this?

    // TODO design: add dark mode on this page
    // TODO design: make page responsive

    const [currentPage, setCurrentPage] = useState('dashboard');

    const changeCurrentPage = (name) => {
        setCurrentPage(name.toLowerCase());
    }

    return (
        <div className="teacher-page">
            <SideBar token={ token } darkMode={ darkMode } setDarkMode={ setDarkMode }
                     snowFlakes={ snowFlakes } setSnowFlakes={ setSnowFlakes } currentPage={currentPage}>
                <SideBarItem icon={ <DashboardIcon /> } name="Dashboard" onClick={ changeCurrentPage } />
                <SideBarItem icon={ <HomeworkIcon /> } name="Homework" onClick={ changeCurrentPage } />
                <SideBarItem icon={ <StudentsIcon /> } name="Students" onClick={ changeCurrentPage } />
            </SideBar>

            <div className="content">
                { currentPage === 'dashboard' && <Dashboard /> }
                { currentPage === 'homework' && <Homework /> }
                { currentPage === 'students' && <Students /> }
            </div>
        </div>
    )
}

export { TeacherPage };
