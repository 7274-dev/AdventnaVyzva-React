import { useEffect, useState } from 'react';
import { useTheme } from '../../../App';
import { GoogleInput, MDEditor } from '../../../components';
import { Dropdown } from '../../../components';
import { toast } from 'react-toastify';
import * as Api from '../../../api';
import { localized } from '../../../hooks/useLocalization';
import moment from 'moment';

const NewHomework = ({ token }) => {
    const newHomeworkClassName = useTheme('new-homework');
    const [clazzes, setClazzes] = useState([
        {
            'id': -2,
            'value': localized('teacherPage.newHomework.loadingClasses')
        }
    ]);

    useEffect(() => {
        const fetchClasses = async () => {
            const response = await Api.classes.getAllClasses(token);

            setClazzes((await response.json()).response.map((clazz) => {
                return {
                    id: clazz.id,
                    value: clazz.name
                };
            }));
        }

        fetchClasses();
    }, [setClazzes, token]);

    // TODO code: fetch classes https://discordapp.com/channels/770229888195493888/833685761470627910/901510338044919819

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [clazz, setClazz] = useState(clazzes[0]);
    const [due, setDue] = useState('');

    const upload = async () => {
        if (!title) {
            toast.error(localized('teacherPage.newHomework.titleEmpty'));
            return;
        }
        if (!due) {
            toast.error(localized('teacherPage.newHomework.dueEmpty'));
            return;
        }
        if (clazz.id === -1) {
            toast.error(localized('teacherPage.newHomework.clazzEmpty'));
            return;
        }
        if (clazz.id === -2) {
            toast.error(localized('teacherPage.newHomework.clazzInvalid'));
            return;
        }

        if (clazz.value === localized('teacherPage.newHomework.selectClass')) {
            toast.error(localized('teacherPage.newHomework.classEmpty'));
            return;
        }

        if ((new Date(due)).setHours(0, 0, 0, 0) < (new Date()).setHours(0, 0, 0, 0)) {
            toast.error(localized('teacherPage.newHomework.dueInPast'));
            return;
        }

        // FIXME
        const response = await Api.homework.createNewHomework(token, clazz.id, title, text, due, moment().format('YYYY-MM-DD'));
        if (response.status !== 200) {
            toast.error(localized('teacherPage.newHomework.uploadError').replace('$ERROR', (await response.json()).error));
        }
        else {
            toast.info(localized('teacherPage.newHomework.uploadSuccess'));
        }
    }

    if (!clazzes) {
        return null;
    }

    return (
        <div className={ newHomeworkClassName }>
            <div className='text-container'>
                <div className='title-container'>
                    <GoogleInput onChange={ setTitle } placeholder={ localized('teacherPage.newHomework.titlePlaceholder') } />
                </div>
                {/* TODO code: add dummy text */}
                <MDEditor token={ token } onChange={ setText } children={ localized('teacherPage.newHomework.mdTemplate') } />
            </div>

            <Dropdown values={ clazzes } onSelect={ setClazz } initial={{
                'id': -1,
                'value': localized('teacherPage.newHomework.selectClass')
            }} />
            <input type='date' className='due' onChange={(e) => setDue(e.target.value)} />

            <button type='submit' onClick={ upload }>{ localized('teacherPage.newHomework.upload') }</button>
        </div>
    )
}

export { NewHomework }
