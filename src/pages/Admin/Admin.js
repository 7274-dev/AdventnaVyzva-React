import { useEffect, useState } from 'react';
import { Loading, redirectMeTo } from '../../components';
import { toast } from 'react-toastify';
import * as Api from '../../api';

const Admin = ({ token }) => {
    // TODO code: finish this page

    const [state, setState] = useState(null);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const fetchUserType = async () => {
        const response = await Api.utils.getUserType(token);
        const fetchedUserType = (await response.json()).response;

        if (fetchedUserType !== 'admin') {
            redirectMeTo('/teacher/uhavenopowerhere');
        }
        else {
            setState(true);
        }
    }

    const submitForm = async (e) => {
        e.preventDefault();

        const response = await Api.teacher.createTeacherAccount(token, name, username, password);

        if (response.status === 200) {
            toast.success('Account created successfully!');
            return;
        }

        toast.error(`Something went wrong... Please contact developers (error: ${(await response.json()).error})`);
    }

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchUserType();
    }, []);

    if (!state) {
        return <Loading />
    }
    return (
        <form onSubmit={ submitForm }>
            <h2>Create teacher account</h2>
            <input placeholder='Name' onChange={(e) => setName(e.target.value)} /><br />
            <input placeholder='Username' onChange={(e) => setUsername(e.target.value)} /><br />
            <input placeholder='Password' onChange={(e) => setPassword(e.target.value)} /><br />
            <button type='submit'>Ok</button>
        </form>
    )
}

export { Admin }
