import { useEffect, useState } from 'react';
import { Loading, redirectMeTo } from '../../components';
import * as Api from '../../api';

const Admin = ({ token }) => {
    // TODO code: finish this page

    const [state, setState] = useState(null);

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

    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        fetchUserType();
    }, []);

    if (!state) {
        return <Loading />
    }
    return (
        <div>

        </div>
    )
}

export { Admin }
