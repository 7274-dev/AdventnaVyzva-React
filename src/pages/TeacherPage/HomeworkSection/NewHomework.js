import { useState } from 'react';
import { useTheme } from '../../../App';
import { GoogleInput, MDInput } from '../../../components';
import { Dropdown } from '../../../components';
import { toast } from 'react-toastify';
import * as Api from '../../../api';
import moment from 'moment';

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
    const [due, setDue] = useState('');

    const upload = async () => {
        if (!title) {
            toast.error('Title cannot be empty');
            return;
        }
        if (!due) {
            toast.error('Due cannot be empty')
            return;
        }

        if ((new Date(due)).setHours(0, 0, 0, 0) < (new Date()).setHours(0, 0, 0, 0)) {
            toast.error('Due cannot be in the past!');
            return;
        }

        const response = await Api.homework.createNewHomework(token, clazz.id, title, text, due, moment().format('YYYY-MM-DD'));
        if (response.status !== 200) {
            toast.error(`Couldn't upload homework... Please contact the developers with this message: ${(await response.json()).response}`);
        }
        else {
            toast.info('Homework uploaded successfully');
        }
    }

    if (!clazzes) {
        return null;
    }

    return (
        <div className={ newHomeworkClassName }>
            <div className='text-container'>
                <div className='title-container'>
                    <GoogleInput onChange={ setTitle } placeholder='Title' />
                </div>
                {/* TODO code: add dummy text */}
                <MDInput token={ token } onChange={ setText }>
                    # This is homework template
                    <br />  // FIXME
                    *giggles*
                </MDInput>
            </div>

            <Dropdown values={ clazzes } onSelect={ setClazz } initial={ clazzes[0] } />
            <input type='date' className='due' onChange={(e) => setDue(e.target.value)} />

            <button type='submit' onClick={ upload }>Upload</button>
        </div>
    )
}

export { NewHomework }
