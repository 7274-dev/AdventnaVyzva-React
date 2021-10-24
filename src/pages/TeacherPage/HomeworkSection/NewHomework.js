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
            'id': 0,
            'value': localized('teacherPage.newHomework.selectClass')
        }
    ]);

    useEffect(() => {
        const fetchClasses = async () => {
            const classes = await Api.classes.getAllClasses(token);

            const response = (await classes.json()).response.map((val, i) => {
                return {
                    value: val.name,
                    id: val.id
                }
            });

            setClazzes(response);
        }
        fetchClasses();
    }, [setClazzes]);

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
        console.log(clazz.value);
        localized('teacherPage.newHomework.selectClass');
        if (clazz.value == localized('teacherPage.newHomework.selectClass')) {
            toast.error(localized('teacherPage.newHomework.classEmpty'));
            return;
        }
        

        if ((new Date(due)).setHours(0, 0, 0, 0) < (new Date()).setHours(0, 0, 0, 0)) {
            toast.error(localized('teacherPage.newHomework.dueInPast'));
            return;
        }

        const response = await Api.homework.createNewHomework(token, clazz.id, title, text, due, moment().format('YYYY-MM-DD'));
        if (response.status !== 200) {
            toast.error(`${localized('teacherPage.newHomework.uploadError')} ${(await response.json()).response}`);
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

            <Dropdown values={ clazzes } onSelect={ setClazz } initial={ clazzes[0] } />
            <input type='date' className='due' onChange={(e) => setDue(e.target.value)} />

            <button type='submit' onClick={ upload }>{ localized('teacherPage.newHomework.upload') }</button>
        </div>
    )
}

export { NewHomework }
