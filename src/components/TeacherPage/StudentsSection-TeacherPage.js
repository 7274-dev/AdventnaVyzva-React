import { useEffect, useState } from 'react';
import { useTheme } from '../../App';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { QueryControls } from './QueryControls-TeacherPage';
import * as Api from '../../Api';
import * as QueryParser from './QueryParser-TeacherPage';
import '../../styles/TeacherPage/StudentsSection-TeacherPage.css';

const Student = ({ id }) => {
    // TODO code: add backend data fetching

    const studentClassName = useTheme('student');

    return (
        <div className={ studentClassName }>
            <h1>{ id } | Name | Username</h1>
            <h2>Some text</h2>
        </div>
    )
}

const StudentsSection = ({ token }) => {
    const orderValues = [
        {
            id: 0,
            value: 'By Name - alphabetically'
        },
        {
            id: 1,
            value: 'By Name - alphabetically reversed'
        }
    ]

    const [order, setOrder] = useState(orderValues[0]);
    const [query, setQuery] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        QueryParser.changeOrder(false, token, order, students, setStudents);
    }, [token, order, students]);

    useEffect(() => {
        const fetchStudents = async () => {
            if ([undefined, null].includes(query)) {
                return;
            }

            const response = await Api.makeGetRequest(token, `/api/search/user?query=${query}`);
            const body = (await response.json()).response;

            setStudents(body);
        }

        setStudents('');
        fetchStudents().catch(err => setStudents('SomethingWentWrong'));
    }, [token, query]);

    return (
        <div className='homework-section'>
            <QueryControls onQuery={ setQuery } onOrder={ setOrder } orderValues={ orderValues } />

            <div className='homework-container'>
                { students === '' && <div /> /* this represents loading, leave it empty */ }
                { students === 'SomethingWentWrong' && <SomethingWentWrong /> }
                { !['', 'SomethingWentWrong'].includes(students) && students.map(id => <Student id={ id } />) }
            </div>
        </div>
    )
}

export { StudentsSection };
