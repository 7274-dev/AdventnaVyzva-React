import { useEffect, useState } from 'react';
import useIsMounted from 'ismounted';
import { useTheme } from '../../../App';
import { BackToHomePageButton, Loading, Prompt } from '../../../components';
import { toast } from 'react-toastify';
import { localized } from '../../../hooks/useLocalization';
import * as Api from '../../../api';
import TrashcanImageLight from '../../../images/trashcan-light.png';
import TrashcanImageDark from '../../../images/trashcan-dark.png';
import './StudentsSection.css';

const StudentsCard = ({ token }) => {
    const [data, setData] = useState(undefined);
    const [isPromptActive, setIsPromptActive] = useState(false);
    const [showBackToHomePageButton, setShowBackToHomePageButton] = useState(false);
    const id = window.location.href.toString().split('/')[window.location.href.toString().split('/').length - 1];
    const isMounted = useIsMounted();
    const darkMode = useTheme('').includes('dark');
    const studentCardClassName = useTheme(`student-card`);

    const fetchData = async () => {
        const response = await Api.student.getStudentById(token, id)
        const data = (await response.json()).response;

        if (response.status !== 200) {
            return;
        }

        if (isMounted.current) {
            setData(data);
        }
    }

    const promptCallback = async (value) => {
        setIsPromptActive(false);

        if (!value) return;

        const response = await Api.student.changeStudentPassword(token, data.id, value);

        if (response.status === 200) {
            toast.success(localized('toast.passwordChangeSuccess'));
        }
        else {
            toast.error(localized('toast.passwordChangeFailure'));
        }
    }

    const changeStudentPassword = () => {
        setIsPromptActive(true);
    }

    const deleteStudent = async () => {
        const response = await Api.student.deleteStudentAccount(token, data.id);

        if (response.status !== 200) {
            toast.error(localized('toast.deleteFailed').replace('$ERROR', (await response.json()).error));
            return;
        }

        toast.success(localized('toast.deleteSuccess'));
        setShowBackToHomePageButton(true);
    }

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchData();
    }, [id, token]);

    if (data === undefined) {
        return <Loading />
    }
    return (
        <div className={ studentCardClassName }>
            <div className='header'>
                <h1>{ data.id }</h1>

                <img src={ darkMode ? TrashcanImageDark : TrashcanImageLight } alt={ localized('teacherPage.classCard.removeImageAlt') } onClick={ deleteStudent } />
            </div>

            <div className='data'>
                <h1>{ data.name }</h1>
                <h2>{ data.username }</h2>

                <br />
            </div>

            <button onClick={ changeStudentPassword }>{ localized('cards.changeStudentPassword') }</button>

            <Prompt message={ localized('prompt.title') } finishCallback={ promptCallback } active={ isPromptActive } isPassword />
            { showBackToHomePageButton && <BackToHomePageButton url='/teacher/students' /> }
        </div>
    )
}

export { StudentsCard }
