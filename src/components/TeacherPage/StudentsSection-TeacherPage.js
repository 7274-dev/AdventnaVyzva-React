import { useEffect, useState } from 'react';
import { useTheme } from '../../App';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { QueryControls } from './QueryControls-TeacherPage';
import * as Api from '../../Api';
import * as QueryParser from './QueryParser-TeacherPage';
import '../../styles/TeacherPage/StudentsSection-TeacherPage.css';

const Student = ({ id, token }) => {
    const studentClassName = useTheme('student');
    const [body, setBody] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.makeGetRequest(token, `/api/admin/student?studentID=${id}`);
                const data = (await response.json()).response;

                setBody(
                    <div className={ studentClassName }>
                        <h1>{ id } | { data.name } | { data.username }</h1>
                    </div>
                );
            }
            catch (err) {
                setBody(
                    <div />
                );
            }
        }

        fetchData();
    }, [id, studentClassName, token]);

    return (
        { body }
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
        <div className='students-section'>
            <QueryControls onQuery={ setQuery } onOrder={ setOrder } orderValues={ orderValues } />

            <div className='students-container'>
                { students === '' && <div /> /* this represents loading, leave it empty */ }
                { students === 'SomethingWentWrong' && <SomethingWentWrong /> }
                { !['', 'SomethingWentWrong'].includes(students) && students.map(id => <Student id={ id } token={ token }
                                                                                                setStudents={ setStudents } />) }
            </div>
        </div>
    )
}

export { StudentsSection };
