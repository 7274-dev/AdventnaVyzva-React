import { useState } from 'react';
import { useTheme } from '../../../App';
import {GoogleInput, MDInput} from '../../../components';
import { Dropdown } from '../../../components';
import { LongInput, Modal, ShortInput } from '../../../components';
import { localized } from '../../../hooks/useLocalization';

const NewHomework = ({ token }) => {
    // TODO code: localization

    const newHomeworkClassName = useTheme('new-homework');
    const [clazzes, setClazzes] = useState([
        {
            'id': 0,
            'value': 'kvarta'
        },
        {
            'id': 1,
            'value': 'kvinta'
        },
        {
            'id': 2,
            'value': 'sexta'
        },
    ]);
    // TODO code: fetch classes https://discordapp.com/channels/770229888195493888/833685761470627910/901510338044919819

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [clazz, setClazz] = useState(clazzes[0]);
    const [due, setDue] = useState(null);

    if (!clazzes) {
        return null;
    }

    return (
        <div className={ newHomeworkClassName }>
            <div className='text-container'>
                <div className='title-container'>
                    <GoogleInput onChange={ setTitle } placeholder='Title' />
                </div>
                <MDInput token={ token } onChange={ setText }>Test</MDInput>
            </div>

            <div className='dropdown-container'>
                <Dropdown values={ clazzes } onSelect={ setClazz } initial={ clazzes[0] } />
                <input type='date' className='due' onChange={(e) => setDue(e.target.value)} />
            </div>

            <button type='submit'>Upload</button>
        </div>
    )
}

export { NewHomework }
