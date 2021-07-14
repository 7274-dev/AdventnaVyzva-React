import { useState, useEffect } from 'react';
import { useTheme } from '../App';
import { SideBar, SideBarItem } from './SideBar';
import { Dropdown } from './Dropdown';
import { Loading } from './Loading';
import { SomethingWentWrong } from './SomethingWentWrong';
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
    // TODO code, design: add dark mode to students section

    const [order, setOrder] = useState(null);
    const [query, setQuery] = useState(null);
    const [students, setStudents] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            setStudents(await Api.makeGetRequest(token, `/api/admin/student`))
        }

        setStudents(<Loading />)
        fetchStudents().catch(err => setStudents(<SomethingWentWrong />));
    }, [token]);

    useEffect(() => {
        const fetchStudents = async () => {
            setStudents(await Api.makeGetRequest(token, `/api/admin/student&order=${order}`))
        }

        setStudents(<Loading />)
        fetchStudents().catch(err => setStudents(<SomethingWentWrong />));
    }, [token, order])

    useEffect(() => {
        const fetchStudents = async () => {
            setStudents(await Api.makeGetRequest(token, `/api/search/user&query=${query}`))
        }

        setStudents(<Loading />)
        fetchStudents().catch(err => setStudents(<SomethingWentWrong />));
    }, [token, query]);

    const values = [
        {
            id: 0,
            value: 'By Name - alphabetically'
        },
        {
            id: 1,
            value: 'By Name - alphabetically inverted'
        },
        {
            id: 2,
            value: 'By Class - alphabetically'
        },
        {
            id: 3,
            value: 'By Class - alphabetically inverted'
        }
    ]

    return (
        <div className='students-page'>
            <div className='controls'>
                <h1 className='order-by-label'>Order by: </h1>
                <div className='order-by-dropdown'>
                    <Dropdown values={ values } onSelect={()=>{}} initial={ values[0] } />
                </div>

                <h1 className='query-label'>Query by: </h1>
                <input className='query-input unselectable' placeholder='AlbertEinstein69' onChange={ (e) => { setQuery(e.target.value) } } />
            </div>

            <div className='students'>
                {
                    students
                }
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
