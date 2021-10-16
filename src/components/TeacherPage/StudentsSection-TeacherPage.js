import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../App';
import useIsMounted from 'ismounted';
import { useResponsiveValue } from '../../hooks/useResponsiveValue';
import { SomethingWentWrong } from '../SomethingWentWrong';
import { QueryControls } from '.';
import { Prompt } from '../Prompt';
import { Modal, ShortInput } from '../Modal';
import EditIconLight from '../../images/edit-light.png';
import EditIconDark from '../../images/edit-dark.png';
import { toast } from 'react-toastify';
import { localized } from '../../hooks/useLocalization';
import * as Api from '../../api';
import * as QueryParser from './QueryParser-TeacherPage';
import '../../styles/TeacherPage/StudentsSection-TeacherPage.css';

const Student = ({ data, openCard }) => {
    if (!data) {
        return null;
    }
    else {
        return (
            <div onClick={() => openCard(data.id)} key={ data.id } className='student'>
                <h1 className='student-id'>{ data.id }</h1>
                <h1 className='student-name'>{ data.name }</h1>
                <h1 className='student-username'>{ data.username }</h1>
            </div>
        )
    }
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
    const [students, setStudents] = useState([]);
    const [studentCardId, setStudentCardId] = useState(null);
    const [timeoutId, setTimeoutId] = useState(0);

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

    const fetchStudents = async () => {
        const students = [];

        const response = await Api.student.queryStudentByName(token, query)
        const body = (await response.json()).response;

        for (const studentId of body) {
            students.push(await fetchStudent(studentId));
        }

        setStudents(students);
    }

    useEffect(() => {
        QueryParser.changeOrder(false, token, order, students, setStudents, 'name');
    }, [token, order, students]);

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        setTimeoutId(setTimeout(() => {
            fetchStudents().catch(() => setStudents('SomethingWentWrong'));
        }, 500));
    }, [token, query]);

    useEffect(() => {
        fetchStudents().catch(() => setStudents('SomethingWentWrong'));
    }, []);

    return (
        <div className='students-section'>
            <QueryControls onQuery={ setQuery } onOrder={ setOrder } orderValues={ orderValues } />

            <div className='students-section-content'>
                <StudentsCard token={ token } id={ studentCardId } />

                <div className='students-container'>
                    { students === '' && <div /> /* this represents loading, leave it empty */ }

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
                        { students.map(data => <Student data={ data } openCard={ openCard } />) }
                    </div> }
                </div>
            </div>
        </div>
    )
}

const StudentsCard = ({ token, id }) => {
    const [data, setData] = useState(undefined);
    const [isPromptActive, setIsPromptActive] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const isMounted = useIsMounted();
    const isMobile = useResponsiveValue(false, true, true);
    const studentCardClassName = useTheme(`student-card${isMobile ? '-mobile' : ''}`);
    const modalNameRef = useRef();
    const modalUsernameRef = useRef();
    const EditIcon = useTheme('').includes('dark') ? EditIconDark : EditIconLight;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.student.fetchStudentById(token, id)
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

        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, [id, token]);

    const promptCallback = async (value) => {
        setIsPromptActive(false);

        if (!value) return;

        // TODO code: change method to work with backend
        const response = await Api.student.changeStudentPassword(token, data.id, value);

        if (response.status === 200) {
            toast.success(localized('toast.passwordChangeSuccess'));
        }
        else {
            toast.error(localized('toast.passwordChangeFailure'));
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
                <img src={ EditIcon } alt={ localized('cards.edit') } onClick={ edit } className='unselectable' />
            </div>

            <div className='data'>
                <h1>{ data.name }</h1>
                <h2>{ data.username }</h2>

                <br />
            </div>

            <button onClick={ changeStudentPassword }>{ localized('cards.changeStudentPassword') }</button>

            <Prompt message={ localized('prompt.title') } finishCallback={ promptCallback } active={ isPromptActive } isPassword />
            <Modal active={ isModalActive } finishCallback={ modalCallback }>
                <ShortInput ref={ modalNameRef } text={ data.name } />
                <ShortInput ref={ modalUsernameRef } text={ data.username } />
            </Modal>
        </div>
    )
}

export { StudentsSection, StudentsCard }
