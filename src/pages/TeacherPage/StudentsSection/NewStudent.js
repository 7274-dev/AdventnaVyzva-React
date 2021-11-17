import { useEffect, useState } from 'react';
import { useTheme } from '../../../App';
import { Dropdown } from '../../../components';
import { toast } from 'react-toastify';
import * as Api from '../../../api';
import { localized } from '../../../hooks/useLocalization';
import { redirectMeTo } from '../../../components';
import './StudentsSection.css';

const NewStudent = ({ token }) => {
    const newStudentClassName = useTheme('new-student');
    const [clazzes, setClazzes] = useState([
        {
            'id': -2,
            'value': localized('teacherPage.newHomework.loadingClasses')
        }
    ]);

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
        // noinspection JSIgnoredPromiseFromCall
        fetchClasses();
    }, [setClazzes, token]);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [clazz, setClazz] = useState(clazzes[0]);

    const create = async () => {
        if (clazz.id === -1) {
            toast.error(localized('teacherPage.newHomework.clazzEmpty'));
            return;
        }
        if (clazz.id === -2) {
            toast.error(localized('teacherPage.newHomework.clazzInvalid'));
            return;
        }

        const response = await Api.student.createStudentAccount(token, username, password, name);
        if (response.status !== 200) {
            toast.error(localized('teacherPage.newStudent.createFailed').replace('$ERROR', (await response.json()).error));
            return;
        }

        const data = (await response.json()).response;

        const response2 = await Api.clazz.addStudentToClass(token, clazz.id, data.id);
        if (response2.status !== 200) {
            toast.error(localized('teacherPage.newStudent.addToClassFailed').replace('$ERROR', (await response2.json()).error));
            return;
        }

        toast.info(localized('teacherPage.newStudent.createSuccess'));

        redirectMeTo('/teacher/students');
    }

    return (
        <div className={ newStudentClassName }>
            <div className='create-student-entry-container'>
                <input onChange={(e) => setName(e.target.value) } value={ name } placeholder={ localized('teacherPage.newStudent.name') } />
                <input onChange={(e) => setUsername(e.target.value) } value={ username } placeholder={ localized('teacherPage.newStudent.username') } />
                <input onChange={(e) => setPassword(e.target.value) } value={ password } placeholder={ localized('teacherPage.newStudent.password') } />
            </div>

            <Dropdown values={ clazzes } onSelect={ setClazz } initial={{
                'id': -1,
                'value': localized('teacherPage.newHomework.selectClass')
            }} />

            <button type='submit' onClick={ create }>{ localized('teacherPage.newStudent.create') }</button>
        </div>
    )
}

export { NewStudent }
