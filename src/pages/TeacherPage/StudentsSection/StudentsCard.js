import { useEffect, useState } from 'react';
import useIsMounted from 'ismounted';
import { useResponsiveValue } from '../../../hooks/useResponsiveValue';
import { useTheme } from '../../../App';
import { Prompt } from '../../../components';
import { toast } from 'react-toastify';
import { localized } from '../../../hooks/useLocalization';
import * as Api from '../../../api';

const StudentsCard = ({ token, id }) => {
    const [data, setData] = useState(undefined);
    const [isPromptActive, setIsPromptActive] = useState(false);
    const isMounted = useIsMounted();
    const isMobile = useResponsiveValue(false, true, true);
    const studentCardClassName = useTheme(`student-card${isMobile ? '-mobile' : ''}`);

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

    if (data === undefined) {
        return (
            <div className={ studentCardClassName } />
        )
    }
    return (
        <div className={ `${studentCardClassName} active` }>
            <div className='header'>
                <h1>{ data.id }</h1>
            </div>

            <div className='data'>
                <h1>{ data.name }</h1>
                <h2>{ data.username }</h2>

                <br />
            </div>

            <button onClick={ changeStudentPassword }>{ localized('cards.changeStudentPassword') }</button>

            <Prompt message={ localized('prompt.title') } finishCallback={ promptCallback } active={ isPromptActive } isPassword />
        </div>
    )
}

export {
    StudentsCard
}
