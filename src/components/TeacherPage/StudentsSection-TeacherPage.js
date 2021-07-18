import { useEffect, useState } from 'react';
import { useTheme } from '../../App';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { QueryControls } from './QueryControls-TeacherPage';
import * as Api from '../../Api';
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
        const sortStudents = async (students, id) => {
            let sortedStudents = [];

            if ([0, 1].includes(id)) {
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

                if (id === 1) {
                    sortedStudents = sortedStudents.reverse();
                }
            }

            return sortedStudents;
        }

        const arraysEqual = (a, b) => {
            if (a === b) return true;
            if (a == null || b == null) return false;
            if (a.length !== b.length) return false;

            for (let i = 0; i < a.length; ++i) {
                if (a[i] !== b[i]) return false;
            }

            return true;
        }

        const updateStudents = async () => {
            if (!order || order.id === '') {
                return;
            }

            const sortedStudents = await sortStudents(students, order.id);

            if (!arraysEqual(sortedStudents, students)) {
                console.log(`Updating students (${students}) to ${sortedStudents}`)
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
                { !['', 'SomethingWentWrong'].includes(students) && students.map(id => <Student id={ id } />) }
            </div>
        </div>
    )
}

export { StudentsSection };
