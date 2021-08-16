import { useEffect, useState } from 'react';
import useIsMounted from 'ismounted';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { QueryControls } from './QueryControls-TeacherPage';
import { Loading } from '../Loading';
import { DelayedRedirect } from '../DelayedRedirect';
import { Prompt } from '../Prompt';
import * as Api from '../../Api';
import * as QueryParser from './QueryParser-TeacherPage';
import '../../styles/TeacherPage/StudentsSection-TeacherPage.css';


const Student = ({ id, token }) => {
    const isMounted = useIsMounted();
    const [body, setBody] = useState(<div />);

    const openCard = () => {
        setBody(<DelayedRedirect to={ `/teacher/students/${id}` } />);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.makeGetRequest(token, `/api/admin/student?studentId=${id}`);
                const data = (await response.json()).response;

                if (response.status !== 200) {
                    throw new Error('UserIsAdminError');
                }

                if (isMounted.current) {
                    setBody(
                        <tr onClick={ openCard }>
                            <td className='student-id'>{ id }</td>
                            <td className='student-name'>{ data.name }</td>
                            <td className='student-username'>{ data.username }</td>
                        </tr>
                    );
                }
            }
            catch (err) {}
        }

        fetchData();
    }, [id, token]);

    return body;
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
                { students === 'SomethingWentWrong' && <div style={{height: '50%'}}>
                    <SomethingWentWrong h1FontSize='2rem' h2FontSize='1.5rem' />
                </div> }
                { !['', 'SomethingWentWrong'].includes(students) &&
                    <table className='students-table'>
                        <tr>
                            <th className='student-id'>Id</th>
                            <th className='student-name'>Name</th>
                            <th className='student-username'>Username</th>
                        </tr>
                        { students.map(id => <Student id={ id } token={ token } />) }
                    </table>
                }
            </div>
        </div>
    )
}

const StudentsCard = ({ token }) => {
    const [data, setData] = useState(undefined);
    const [prompt, setPrompt] = useState(null);
    const isMounted = useIsMounted();
    const id = window.location.href.toString().split('/')[window.location.href.toString().split('/').length - 1];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.makeGetRequest(token, `/api/admin/student?studentId=${id}`);
                const data = (await response.json()).response;

                if (response.status !== 200) {
                    throw new Error('UserIsAdminError');
                }

                if (isMounted.current) {
                    setData(data);
                }
            }
            catch (err) {}
        }

        if (id !== undefined) {
            fetchData();
        }
    }, [token]);

    const changeStudentPassword = () => {
        // TODO code, design: add prompting for password
        const finishCallback = value => {
            setPrompt(null);
        }

        setPrompt(<Prompt message='Please enter new password: ' finishCallback={ finishCallback } />)
    }

    if (data === undefined) {
        return (
            <Loading />
        );
    }

    return (
        <div className='student-card'>
            <h1>{ data.id }</h1>

            <div className='data'>
                <h1>{ data.name }</h1>
                <h2>{ data.username }</h2>

                <br /><br />
            </div>

            <button onClick={ changeStudentPassword }>Change student password</button>

            { prompt }
        </div>
    )
}

export { StudentsSection, StudentsCard };
