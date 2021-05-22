import { useEffect, useState} from "react";
import { TeacherPage } from './TeacherPage';
import { StudentsPage } from './StudentsPage';
import { DelayedRedirect } from './DelayedRedirect';
import * as Api from '../Api';
import { ReactComponent as TreeIcon } from '../images/tree.svg';
import '../styles/Login.css';

const Home = ({ isLoggedIn, token }) => {
    const [userType, setUserType] = useState(undefined);

    if (!isLoggedIn) {
        return (
            <div className="login-redirect">
                <TreeIcon />
                <h1>You have to log in to use this website!</h1><br/>
                <h1>Redirecting...</h1>
                <DelayedRedirect to="/login" delay={ 3500 }/>
            </div>
        )
    }

    // eslint-disable-next-line
    useEffect(() => {
        const fetchUserType = async () => {
            setUserType(await Api.getUserType(token));
        };

        // noinspection JSIgnoredPromiseFromCall
        fetchUserType();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            { userType === 'student' && <StudentsPage /> }
            { userType === 'teacher' && <TeacherPage /> }
            { userType === undefined && <div>fuck</div> }
        </div>
    )
}

export { Home };
