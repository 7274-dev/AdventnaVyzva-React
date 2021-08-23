import {useEffect, useRef, useState} from 'react';
import { useTheme } from '../../App';
import useIsMounted from 'ismounted';
import { useResponsiveValue } from '../../hooks/useResponsiveValue';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { QueryControls } from './QueryControls-TeacherPage';
import { Prompt } from '../Prompt';
import { Modal, ShortInput } from '../Modal';
import EditIconLight from '../../images/edit-light.png';
import EditIconDark from '../../images/edit-dark.png';
import { toast } from 'react-toastify';
import * as Api from '../../Api';
import * as QueryParser from './QueryParser-TeacherPage';
import '../../styles/TeacherPage/StudentsSection-TeacherPage.css';

const Student = ({ data, openCard }) => {
    if (!data) {
        return <div />;
    }
    else {
        return (
            <tr onClick={() => openCard(data.id)}>
                <td className='student-id'>{ data.id }</td>
                <td className='student-name'>{ data.name }</td>
                <td className='student-username'>{ data.username }</td>
            </tr>
        )
    }
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
        QueryParser.changeOrder(false, token, order, students, setStudents, 'name');
    }, [token, order, students]);

    useEffect(() => {
        const fetchStudent = async (id) => {
            try {
                const response = await Api.makeGetRequest(token, `/api/admin/student?studentId=${id}`);
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

        const fetchStudents = async () => {
            const students = [];

            if ([undefined, null].includes(query)) {
                return;
            }

            const response = await Api.makeGetRequest(token, `/api/search/user?query=${query}`);
            const body = (await response.json()).response;

            for (const studentId of body) {
                students.push(await fetchStudent(studentId));
            }

            setStudents(students);
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

                    { students === 'SomethingWentWrong' &&
                    <div style={{height: '50%'}}>
                        <SomethingWentWrong h1FontSize='2rem' h2FontSize='1.5rem' />
                    </div> }

                    { !['', 'SomethingWentWrong'].includes(students) &&
                    <table className='students-table'>
                        <tr>
                            <th className='student-id'>Id</th>
                            <th className='student-name'>Name</th>
                            <th className='student-username'>Username</th>
                        </tr>
                        { students.map(data => <Student data={ data } openCard={ openCard } />) }
                    </table> }
                </div>

                <StudentsCard token={ token } id={ studentCardId } />
            </div>
        </div>
    )
}

const StudentsCard = ({ token, id }) => {
    const [data, setData] = useState(undefined);
    const [isPromptActive, setIsPromptActive] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const isMounted = useIsMounted();
    const isMobile = useResponsiveValue(false, true);
    const studentCardClassName = useTheme(`student-card${isMobile ? '-mobile' : ''}`);
    const modalNameRef = useRef();
    const modalUsernameRef = useRef();
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
        setIsPromptActive(false);

        if (!value) return;

        // TODO code: change method to work with backend
        const response = await Api.changeStudentPassword(token, data.id, value);

        if (response.status === 200) {
            toast.success('Password changed successfully.');
        }
        else {
            toast.error('Error occurred while changing password...');
        }
    }

    const modalCallback = (exitBool) => {
        setIsModalActive(false);

        if (!exitBool) return;

        // TODO backend: make mapping for this
    }

    const changeStudentPassword = () => {
        setIsPromptActive(true);
    }

    const edit = () => {
        setIsModalActive(true);
    }

    if (data === undefined) {
        return null;
    }

    return (
        <div className={ studentCardClassName }>
            <div className='header'>
                <h1>{ data.id }</h1>
                <img src={ EditIcon } alt='Edit' onClick={ edit } className='unselectable' />
            </div>

            <div className='data'>
                <h1>{ data.name }</h1>
                <h2>{ data.username }</h2>

                <br />
            </div>

            <button onClick={ changeStudentPassword }>Change student password</button>

            <Prompt message='Please enter new password' finishCallback={ promptCallback } active={ isPromptActive } isPassword />
            <Modal active={ isModalActive } finishCallback={ modalCallback }>
                <ShortInput ref={ modalNameRef } text={ data.name } />
                <ShortInput ref={ modalUsernameRef } text={ data.username } />
            </Modal>
        </div>
    )
}

export { StudentsSection, StudentsCard };
