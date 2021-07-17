import { useEffect, useState } from 'react';
import { Loading } from '../Loading';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { QueryControls } from './QueryControls-TeacherPage';
import * as Api from '../../Api';
import '../../styles/TeacherPage/StudentsSection-TeacherPage.css';

const StudentsSection = ({ token }) => {
    const orderValues = [
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

    const [order, setOrder] = useState(orderValues[0]);
    const [query, setQuery] = useState('');
    const [students, setStudents] = useState(null);

    // TODO management: force backend devs to do querying on backend (or just do it here, on frontend)
    useEffect(() => {
        const fetchStudents = async () => {
            const response = await Api.makeGetRequest(token, `/api/admin/student&order=${order.value.toLowerCase()}`);
            setStudents((await response.json()).response);
        }

        setStudents('Loading');
        fetchStudents().catch(err => setStudents('SomethingWentWrong'));
    }, [token, order]);

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await Api.makeGetRequest(token, `/api/search/user&query=${query}`);
            setStudents((await response.json()).response);
        }

        setStudents('Loading');
        fetchStudents().catch(err => setStudents('SomethingWentWrong'));
    }, [token, query]);

    return (
        <div className='students-section'>
            <QueryControls onQuery={ setQuery } onOrder={ setOrder } orderValues={ orderValues } />

            <div className='students'>
                { students === 'Loading' && <div /> } {/* do we want to display loading or not? it may cause flashbangs */}
                { students === 'SomethingWentWrong' && <SomethingWentWrong /> }
                { !['Loading', 'SomethingWentWrong'].includes(students) && students }
            </div>
        </div>
    )
}

export { StudentsSection };
