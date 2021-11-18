import { useState } from 'react';
import { useTheme } from '../../../App';
import { localized } from '../../../hooks/useLocalization';
import { isDefined } from '../../../hooks/isDefined';
import * as Api from '../../../api';
import { toast } from 'react-toastify';
import { redirectMeTo } from '../../../components';
import './ClassesSection.css';

const NewClass = ({ token }) => {
    const [name, setName] = useState('');
    const newClassClassName = useTheme('new-class');

    const create = async () => {
        if (!isDefined(name)) {
            toast.error(localized('teacherPage.newClass.nameEmptyError'));
            return;
        }

        const response = await Api.clazz.createClass(token, name);
        if (response.status !== 200) {
            toast.error(localized('teacherPage.newClass.createError').replace('$ERROR', (await response.json()).error));
            return;
        }

        toast.success(localized('teacherPage.newClass.createSuccess'));
        redirectMeTo('/teacher/classes');
    }

    return (
        <div className={ newClassClassName }>
            <div className='create-class-entry-container'>
                <input onChange={(e) => setName(e.target.value) } value={ name } placeholder={ localized('teacherPage.newClass.name') } />
            </div>

            <button type='submit' onClick={ create }>{ localized('teacherPage.newStudent.create') }</button>
        </div>
    )
}

export { NewClass }
