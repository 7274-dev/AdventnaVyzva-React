import { useEffect, useState } from 'react';
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
            value: 'By Name - alphabetically reversed'
        }
    ]

    const [order, setOrder] = useState(orderValues[0]);
    const [query, setQuery] = useState('');
    const [students, setStudents] = useState([]);

    // TODO code: make student component
    // TODO code: force backend devs to do querying on backend (or just do it here, on frontend)
    useEffect(() => {
        const sortStudents = async (students, order) => {
            let sortedStudents = [];

            if ([0, 1].includes(order.id)) {
                for (let student of students) {
                    let index = 0;
                    for (let sortedStudent of sortedStudents) {
                        if (student > sortedStudent) {
                            index++;
                        }
                        else {
                            break;
                        }
                    }

                    sortedStudents.splice(index, 0, student);
                }

                if (order.id === 1) {
                    sortedStudents = sortedStudents.reverse();
                }
            }

            return sortedStudents;
        }

        const arrayEquals = (a, b) => {
            return Array.isArray(a) &&
                Array.isArray(b) &&
                a.length === b.length &&
                a.every((val, index) => val === b[index]);
        }

        const updateStudents = async () => {
            if (!order) {
                return;
            }

            const sortedStudents = await sortStudents(students, order);

            if (!arrayEquals(sortedStudents, students)) {
                setStudents(sortedStudents);
            }
        }

        updateStudents().catch(r => {});
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

            <div className='students'>
                { students === '' && <div /> /* this represents loading, leave it empty */ }
                { students === 'SomethingWentWrong' && <SomethingWentWrong /> }
                { !['', 'SomethingWentWrong'].includes(students) && students }
            </div>
        </div>
    )
}

export { StudentsSection };
