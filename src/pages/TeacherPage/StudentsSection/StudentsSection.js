import { useEffect, useState } from 'react';
import { useTheme } from '../../../App';
import { Loading, redirectMeTo, SomethingWentWrong } from '../../../components';
import { QueryControls } from '../index';
import { StudentsCard } from './StudentsCard';
import { localized } from '../../../hooks/useLocalization';
import { isDefined } from '../../../hooks/isDefined';
import * as Api from '../../../api';
import * as QueryParser from '../QueryManager/QueryParser';
import NewImageDark from '../../../images/new-dark.png';
import NewImageLight from '../../../images/new-light.png';
import './StudentsSection.css';

const Student = ({ data, openCard }) => {
    if (!data) {
        return null;
    }
    return (
        <div onClick={() => openCard(data.id)} key={ data.id } className='student'>
            <h1 className='student-id'>{ data.id }</h1>
            <h1 className='student-name'>{ data.name }</h1>
            <h1 className='student-username'>{ data.username }</h1>
        </div>
    )
}

const StudentsSection = ({ token }) => {
    const orderValues = [
        {
            id: 0,
            value: localized('dropdown.byNameAlphabetically')
        },
        {
            id: 1,
            value: localized('dropdown.byNameAlphabeticallyReversed')
        }
    ]

    const [order, setOrder] = useState(orderValues[0]);
    const [query, setQuery] = useState('');
    const [students, setStudents] = useState('');
    const [studentCardId, setStudentCardId] = useState(null);
    const [timeoutId, setTimeoutId] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const darkMode = useTheme('').includes('dark');
    const [isAdmin, setAdmin] = useState(false); 

    const openCard = (id) => {
        setStudentCardId(id);
    }

    const fetchStudent = async (id) => {
        try {
            const response = await Api.student.fetchStudentById(token, id);
            const data = (await response.json()).response;

            if (response.status !== 200) {
                throw new Error('UserIsAdminError');
            }

            return data;
        }
        catch (err) {
            return null;
        }
    }

    const fetchAllStudents = async () => {
        const students = [];

        const response = await Api.student.queryStudentByName(token, query)
        const body = (await response.json()).response;

        for (const studentId of body) {
            students.push(await fetchStudent(studentId));
        }

        setStudents(students);
        QueryParser.changeOrder(false, token, order, students, setStudents, 'name');
    }

    const fetchStudentsWithoutLoading = async () => {
        const students = [];

        let response = await Api.student.queryStudentByName(token, query);
        const body = (await response.json()).response;

        for (const studentId of body) {
            students.push(await fetchStudent(studentId));
            setStudents(students);
            QueryParser.changeOrder(false, token, order, students, setStudents, 'name');
        }

        QueryParser.changeOrder(false, token, order, students, setStudents, 'name');
        setLoading(false);
    }

    const createNewStudent = () => {
        redirectMeTo('/teacher/student/new');
    }

    useEffect(() => {
        QueryParser.changeOrder(false, token, order, students, setStudents, 'name');
    }, [token, order]);

    useEffect(() => {
        const fetchIsAdmin = async () => {
            const response = await Api.utils.getUserType(token);
            const userType = (await response.json()).response

            setAdmin(userType === 'admin');
        }
        
        fetchIsAdmin();
    }, [])

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        setTimeoutId(setTimeout(() => {
            if (!isLoading) {
                // noinspection JSIgnoredPromiseFromCall
                fetchAllStudents();
            }
        }, 500));
    }, [token, query]);

    useEffect(() => {
        if (!isLoading && isDefined(query)) {
            // noinspection JSIgnoredPromiseFromCall
            fetchStudentsWithoutLoading();
        }
    }, [isLoading]);

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchStudentsWithoutLoading();
    }, []);

    return (
        <div className='students-section'>
            <QueryControls onQuery={ setQuery } onOrder={ setOrder } orderValues={ orderValues } />

            <div className='students-section-content'>
                <StudentsCard token={ token } id={ studentCardId } />

                <div className='students-container'>
                    { students === '' && <Loading /> /* this represents loading, leave it empty */ }

                    { students === 'SomethingWentWrong' &&
                    <div style={{height: '50%'}}>
                        <SomethingWentWrong h1FontSize='2rem' h2FontSize='1.5rem' />
                    </div> }

                    { !['', 'SomethingWentWrong'].includes(students) &&
                    <div className='students-table'>
                        <div className='header'>
                            <h1 className='student-id'>{ localized('teacherPage.id') }</h1>
                            <h1 className='student-name'>{ localized('teacherPage.name') }</h1>
                            <h1 className='student-username'>{ localized('teacherPage.username') }</h1>
                        </div>
                        { students.map((data) => <Student data={ data } openCard={ openCard } />) }
                    </div> }
                </div>
            </div>

            { isAdmin && <img src={ darkMode ? NewImageDark : NewImageLight } alt={ localized('teacherPage.newStudentImageAlt') }
                 className='new-student-button unselectable' onClick={ createNewStudent } title={ localized('teacherPage.newStudentImageAlt') } /> }
        </div>
    )
}

export { StudentsSection }
