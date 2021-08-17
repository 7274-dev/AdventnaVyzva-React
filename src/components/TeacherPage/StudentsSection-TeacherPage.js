import { useEffect, useState } from 'react';
import { useTheme } from '../../App';
import useIsMounted from 'ismounted';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { QueryControls } from './QueryControls-TeacherPage';
import { Prompt } from '../Prompt';
import EditIconLight from '../../images/edit-light.png';
import EditIconDark from '../../images/edit-dark.png';
import { toast } from 'react-toastify';
import * as Api from '../../Api';
import * as QueryParser from './QueryParser-TeacherPage';
import '../../styles/TeacherPage/StudentsSection-TeacherPage.css';

const Student = ({ id, token, openCard }) => {
    const isMounted = useIsMounted();
    const [body, setBody] = useState(<div />);

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
                        <tr onClick={() => openCard(id)}>
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
    const [studentCardId, setStudentCardId] = useState(null);

    const openCard = (id) => {
        setStudentCardId(id);
    }

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

            <div className='students-section-content'>
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
                        { students.map(id => <Student id={ id } token={ token } openCard={ openCard } />) }
                    </table>
                    }
                </div>

                <StudentsCard token={ token } id={ studentCardId } />
            </div>
        </div>
    )
}

const StudentsCard = ({ token, id }) => {
    // TODO code, design: make this responsive

    const [data, setData] = useState(undefined);
    const [promptActive, setPromptActive] = useState(null);
    const isMounted = useIsMounted();
    const studentCardClassName = useTheme('student-card');
    const EditIcon = useTheme('').includes('dark') ? EditIconDark : EditIconLight;

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

        fetchData();
    }, [id, token]);

    const promptCallback = async (value) => {
        setPromptActive(false);

        if (!value) return;

        const response = await Api.changeStudentPassword(token, data.id, value);

        if (response.status === 200) {
            toast.success('Password changed successfully.');
        }
        else {
            toast.error('Error occurred while changing password...');
        }
    }

    const changeStudentPassword = () => {
        setPromptActive(true);
    }

    const edit = () => {

    }

    if (data === undefined) {
        return null;
    }

    return (
        <div className={ studentCardClassName }>
            <h1>{ data.id }</h1>
            <img src={ EditIcon } alt='Edit' onClick={ edit } />

            <div className='data'>
                <h1>{ data.name }</h1>
                <h2 className='unselectable'>{ data.username }</h2>

                <br className='unselectable' /><br className='unselectable' />
            </div>

            <button onClick={ changeStudentPassword }>Change student password</button>


            <Prompt message='Please enter new password' finishCallback={ promptCallback } active={ promptActive } />
        </div>
    )
}

export { StudentsSection, StudentsCard };
