import { useState, useEffect } from 'react';
import { useTheme } from '../App';
import { SideBar, SideBarItem } from './SideBar';
import { Dropdown } from './Dropdown';
import { ReactComponent as DashboardIcon } from '../images/dashboard.svg';
import { ReactComponent as HomeworkIcon } from '../images/homework.svg';
import { ReactComponent as StudentsIcon } from '../images/students.svg';
import * as Api from '../Api';
import '../styles/TeacherPage.css';
import '../styles/Settings.css';

const Dashboard = ({ token }) => {
    return (
        <div>
            <h1>
                Dashboard
            </h1>
        </div>
    )
}

const Homework = ({ token }) => {
    return (
        <div>
            <h1>
                Homework
            </h1>
        </div>
    )
}

const Students = ({ token }) => {
    const [order, setOrder] = useState(null);
    const [query, setQuery] = useState(null);

    const students = null;

    const values = [
        {
            id: 0,
            value: 'Item 0'
        },
        {
            id: 1,
            value: 'Item 1'
        },
        {
            id: 2,
            value: 'Item 2'
        }
    ]

    return (
        <div className='students-page'>
            <div className='controls'>
                <h1 className='order-by-label'>Order by: </h1>

                <div className='order-by-dropdown'>
                    <Dropdown values={ values } onSelect={()=>{}} initial={ values[0] } />
                </div>
            </div>

            <div className='students-list'>
            </div>
        </div>
    )
}

const TeacherPage = ({ token, darkMode, setDarkMode, snowFlakes, setSnowFlakes }) => {
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
                     snowFlakes={ snowFlakes } setSnowFlakes={ setSnowFlakes } currentPage={currentPage}>
                <SideBarItem icon={ <DashboardIcon /> } name='Dashboard' onClick={ changeCurrentPage } />
                <SideBarItem icon={ <HomeworkIcon /> } name='Homework' onClick={ changeCurrentPage } />
                <SideBarItem icon={ <StudentsIcon /> } name='Students' onClick={ changeCurrentPage } />
            </SideBar>

            <div className='content'>
                { currentPage === 'dashboard' && <Dashboard token={ token } /> }
                { currentPage === 'homework' && <Homework token={ token } /> }
                { currentPage === 'students' && <Students token={ token } /> }
            </div>
        </div>
    )
}

export { TeacherPage };
