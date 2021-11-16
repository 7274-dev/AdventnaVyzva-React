import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../../App';
import { Loading, Modal, NotFoundPage, redirectMeTo, ShortInput } from '../../../components';
import { BackToHomePageButton } from '../../../components';
import { isDefined } from '../../../hooks/isDefined';
import { localized } from '../../../hooks/useLocalization';
import { toast } from 'react-toastify';
import * as Api from '../../../api';
import EditIconDark from '../../../images/edit-dark.png';
import EditIconLight from '../../../images/edit-light.png';
import TrashcanImageDark from '../../../images/trashcan-dark.png';
import TrashcanImageLight from '../../../images/trashcan-light.png';
import './ClassesSection.css';

const Student = ({ data }) => {
    if (!isDefined(data)) {
        return null;
    }
    return (
        <div className='student' onClick={() => redirectMeTo(`/teacher/student/${data.id}`)}>  {/* FIXME */}
            <h1 className='student-id'>{ data.id }</h1>
            <h1 className='student-name'>{ data.name }</h1>
            <h1 className='student-username'>{ data.username }</h1>
        </div>
    )
}

const ClassCard = ({ token }) => {
    const [data, setData] = useState('');
    const [students, setStudents] = useState([]);
    const [showBackToHomePageButton, setShowBackToHomePageButton] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);
    const modalNameRef = useRef();
    const classCardClassName = useTheme('class-card');
    const id = window.location.href.toString().split('/')[window.location.href.toString().split('/').length - 1];
    const darkMode = useTheme('').includes('dark');

    const fetchData = async () => {
        const response = await Api.clazz.getClassById(token, id);

        if (response.status === 404) {
            setData('NotFound');
            return;
        }
        if (response.status !== 200) {
            toast.error(localized('teacherPage.classCard.fetchFailed').replace('$ERROR', (await response.json()).error));
            return;
        }

        setData((await response.json()).response);
    }

    const fetchStudents = async () => {
        const response = await Api.clazz.getAllStudentsInClass(token, id);

        if (response.status === 404) {
            return;
        }
        if (response.status !== 200) {
            toast.error(localized('teacherPage.classCard.fetchStudentsFailed').replace('$ERROR', (await response.json()).error));
            return;
        }

        let students = [];
        for (const id of (await response.json()).response) {
            const studentResponse = await Api.student.getStudentById(token, id);

            if (studentResponse.status === 404) {
                continue;
            }
            if (studentResponse.status !== 200) {
                toast.error(localized('teacherPage.classCard.fetchStudentsFailed').replace('$ERROR', (await studentResponse.json()).error));
                continue;
            }

            console.log(`response`, studentResponse)

            students.push((await studentResponse.json()).response);
        }

        setStudents(students);
    }

    const edit = () => {
        setIsModalActive(true);
    }

    const deleteMe = async () => {
        const response = await Api.clazz.deleteClass(token, id);

        if (response.status !== 200) {
            toast.error(localized('teacherPage.classCard.deleteFailed').replace('$ERROR', (await response.json()).error));
            return;
        }

        toast.info(localized('teacherPage.classCard.deleteSuccess'));
        setShowBackToHomePageButton(true);
    }

    const modalCallback = async (exitBool) => {
        setIsModalActive(false);

        if (!exitBool) return;

        const response = await Api.clazz.editClass(token, modalNameRef?.current?.value, id);

        if (response.status !== 200) {
            toast.error(localized('teacherPage.classCard.editFailed').replace('$ERROR', (await response.json()).error));
            return;
        }

        toast.info(localized('teacherPage.classCard.editSuccess'));
        redirectMeTo('/teacher/classes');
    }

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchData();
        // noinspection JSIgnoredPromiseFromCall
        fetchStudents();
    }, []);

    if (data === '') {
        return <Loading />
    }
    else if (data === 'NotFound') {
        return <NotFoundPage />
    }
    return (
        <div className={ classCardClassName }>
            <div className='header'>
                <h1>{ data.id }</h1>
                <div className='header-splitter' />
                <img src={ darkMode ? EditIconDark : EditIconLight } onClick={ edit } alt={ localized('cards.edit') } title={ localized('cards.edit') } className='unselectable' />
                <img src={ darkMode ? TrashcanImageDark : TrashcanImageLight } onClick={ deleteMe } alt={ localized('cards.delete') } title={ localized('cards.delete') } className='unselectable' />
            </div>

            <div className='data'>
                <h1>{ data.name }</h1>

                <div className='students'>
                    { students.length === 0 && <div>{ localized('teacherPage.classCard.noStudents') }</div> }
                    { students.map((data, index) => <Student key={ index } data={ data } />) }
                </div>
            </div>

            { showBackToHomePageButton && <BackToHomePageButton url='/teacher/classes' /> }

            <Modal active={ isModalActive } finishCallback={ modalCallback }>
                <ShortInput round inputRef={ modalNameRef } text={ data.name } />
            </Modal>
        </div>
    )
}

export { ClassCard }
