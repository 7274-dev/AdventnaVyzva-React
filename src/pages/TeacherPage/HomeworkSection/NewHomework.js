import { useEffect, useState } from 'react';
import { useTheme } from '../../../App';
import { GoogleInput, MDEditor } from '../../../components';
import { Dropdown } from '../../../components';
import { toast } from 'react-toastify';
import * as Api from '../../../api';
import { localized } from '../../../hooks/useLocalization';
import { redirectMeTo } from '../../../components';
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
    const [files, setFiles] = useState([]);

    const readFile = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => resolve(event.target.result);
            reader.onerror = (err) => reject(err);

            reader.readAsDataURL(file);
        });
    }

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

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', await readFile(file));
            console.log(file)
            console.log(formData)
            console.log(await readFile(file), typeof await readFile(file))

            // continue;
            const response = await Api.file.uploadFile(token, formData)
            if (response.status !== 200) {
                toast.error(`${localized('toast.uploadFileError')} ${file.name}`);
            }
        }

        // return;
        const parsedDue = `${due.split('-')[2]}-${due.split('-')[1]}-${due.split('-')[0]} 23:59:59`

        // FIXME
        const response = await Api.homework.createNewHomework(token, clazz.id, title, text, parsedDue, moment().format('DD-MM-YYYY HH:mm:ss'));
        if (response.status !== 200) {
            toast.error(localized('teacherPage.newHomework.uploadError').replace('$ERROR', (await response.json()).error));
        }
        else {
            toast.info(localized('teacherPage.newHomework.uploadSuccess'));
            redirectMeTo('/teacher/homework');
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
            <input type='date' onChange={(e) => setDue(e.target.value)} />
            <input type='file' multiple onChange={(e) => setFiles(e.target.files)} />

            <button type='submit' onClick={ upload }>{ localized('teacherPage.newHomework.upload') }</button>
        </div>
    )
}

export { NewHomework }
