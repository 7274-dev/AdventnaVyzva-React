import { useEffect, useState } from 'react';
import { Loading } from '../Loading';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { QueryControls } from './QueryControls-TeacherPage';
import * as Api from '../../Api';
import '../../styles/TeacherPage/StudentsSection-TeacherPage.css';

const StudentsSection = ({ token }) => {
    const [order, setOrder] = useState(null);
    const [query, setQuery] = useState(null);
    const [students, setStudents] = useState(null);

    useEffect(() => {
        const fetchStudents = async () => {
            // TODO code: fix 'Objects are not valid as a React child'
            setStudents(await Api.makeGetRequest(token, `/api/admin/student&order=${order}`));
        }

        setStudents('Loading');
        fetchStudents().catch(err => setStudents('SomethingWentWrong'));
    }, [token, order]);

    useEffect(() => {
        const fetchStudents = async () => {
            setStudents(await Api.makeGetRequest(token, `/api/search/user&query=${query}`));
        }

        setStudents('Loading');
        // TODO code: fix 'Objects are not valid as a React child'
        fetchStudents().catch(err => setStudents('SomethingWentWrong'));
    }, [token, query]);

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

    return (
        <div className='students-section'>
            <QueryControls onQuery={ setQuery } onOrder={ setOrder } orderValues={ orderValues } />

            <div className='students'>
                { students === 'Loading' && <Loading /> }
                { students === 'SomethingWentWrong' && <SomethingWentWrong /> }
                { !['Loading', 'SomethingWentWrong'].includes(students) && students }
            </div>
        </div>
    )
}

export { StudentsSection };
