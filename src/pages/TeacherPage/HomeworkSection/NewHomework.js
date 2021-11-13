import { useEffect, useState } from 'react';
import { useTheme } from '../../../App';
import { GoogleInput, MDEditor } from '../../../components';
import { Dropdown } from '../../../components';
import { toast } from 'react-toastify';
import * as Api from '../../../api';
import { localized } from '../../../hooks/useLocalization';
import { redirectMeTo } from '../../../components';
import moment from 'moment';
import CheckBox from 'react-animated-checkbox';

const NewHomework = ({ token }) => {
    const newHomeworkClassName = useTheme('new-homework');
    const [clazzes, setClazzes] = useState([
        {
            'id': -2,
            'value': localized('teacherPage.newHomework.loadingClasses')
        }
    ]);
    const darkMode = useTheme('').includes('dark');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [clazz, setClazz] = useState(clazzes[0]);
    const [due, setDue] = useState('');
    const [files, setFiles] = useState([]);
    const [shouldCreateBall, setShouldCreateBall] = useState(true);

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

        localStorage.setItem('markdown', '');

        if ((new Date(due)).setHours(0, 0, 0, 0) < (new Date()).setHours(0, 0, 0, 0)) {
            toast.error(localized('teacherPage.newHomework.dueInPast'));
            return;
        }

        let uploadedFiles = [];
        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file);

            const response = await Api.file.uploadFile(token, formData)
            if (response.status !== 200) {
                toast.error(`${localized('toast.uploadFileError')} ${file.name}`);
            }
            else {
                uploadedFiles.push((await response.json()).response);
            }
        }

        const parsedDue = `${due.split('-')[2]}-${due.split('-')[1]}-${due.split('-')[0]} 23:59:59`
        const response = await Api.homework.createNewHomework(token, clazz.id, title, text, parsedDue, moment().format('DD-MM-YYYY HH:mm:ss'));
        const clonedResponse = response.clone();
        if (response.status !== 200) {
            toast.error(localized('teacherPage.newHomework.uploadError').replace('$ERROR', (await response.json()).error));
        }
        else {
            if (shouldCreateBall) {
                const homeworkId = (await clonedResponse.json()).response.id;
                const response = await Api.homework.createHomeworkBall(token, homeworkId);

                if (response.status !== 200) {
                    toast.error(localized('teacherPage.newHomework.ballCreateError').replace('$ERROR', (await response.json()).error))
                    return;
                }

            }

            toast.info(localized('teacherPage.newHomework.uploadSuccess'));

            const homeworkId = (await response.json()).response.id;
            for (const uploadedFile of uploadedFiles) {
                const response = await Api.homework.addAttachment(token, homeworkId, uploadedFile.id);

                if (response.status !== 200) {
                    toast.error(localized('teacherPage.newHomework.attachmentError').replace('$ERROR', (await response.json()).error));
                }
            }

            redirectMeTo('/teacher/homework');
        }
    }

    const fetchClasses = async () => {
        const response = await Api.clazz.getAllClasses(token);

        setClazzes((await response.json()).response.map((clazz) => {
            return {
                id: clazz.id,
                value: clazz.name
            };
        }));
    }

    useEffect(() => {
        fetchClasses();
    }, [setClazzes, token]);

    return (
        <div className={ newHomeworkClassName }>
            <div className='text-container'>
                <div className='title-container'>
                    <GoogleInput onChange={ setTitle } placeholder={ localized('teacherPage.newHomework.titlePlaceholder') } />
                </div>

                <MDEditor token={ token } onChange={ setText } children={ localized('teacherPage.newHomework.mdTemplate') } />
            </div>

            <Dropdown values={ clazzes } onSelect={ setClazz } initial={{
                'id': -1,
                'value': localized('teacherPage.newHomework.selectClass')
            }} />
            <input type='date' onChange={(e) => setDue(e.target.value)} />
            <input type='file' multiple onChange={(e) => setFiles(e.target.files)} />
            <div className='homework-checkbox-container'>
                <CheckBox
                    checked={ shouldCreateBall }
                    checkBoxStyle={{
                        checkedColor: `#34b93d`,
                        size: 25,
                        unCheckedColor: `${ darkMode ? '#e0e0e0' : '#939393' }`
                    }}
                    duration={ 200 }
                    onClick={() => setShouldCreateBall(!shouldCreateBall)}
                />
                <div className='homework-checkbox-label'>{ localized('teacherPage.newHomework.shouldCreateBall') }</div>
            </div>

            <button type='submit' onClick={ upload }>{ localized('teacherPage.newHomework.upload') }</button>
        </div>
    )
}

export { NewHomework }
