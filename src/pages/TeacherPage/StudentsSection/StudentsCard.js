import { useEffect, useRef, useState } from 'react';
import useIsMounted from 'ismounted';
import { useResponsiveValue } from '../../../hooks/useResponsiveValue';
import { useTheme } from '../../../App';
import { Modal, Prompt, ShortInput } from '../../../components';
import { toast } from 'react-toastify';
import { localized } from '../../../hooks/useLocalization';
import * as Api from '../../../api';
import EditIconDark from '../../../images/edit-dark.png';
import EditIconLight from '../../../images/edit-light.png';

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

export {
    StudentsCard
}
