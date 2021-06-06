import { useEffect, useState} from 'react';
import { useTheme } from '../App';
import { TeacherPage } from './TeacherPage';
import { StudentsPage } from './StudentsPage';
import { SnowFlakes } from './SnowFlakes';
import { DelayedRedirect } from './DelayedRedirect';
import * as Api from '../Api';
import { ReactComponent as TreeIcon } from '../images/tree.svg';
import '../styles/Login.css';

const Home = ({ token, darkMode, setDarkMode, snowFlakes, setSnowFlakes }) => {
    const [userType, setUserType] = useState(undefined);

    const loginRedirectClassName = useTheme("login-redirect");

    useEffect(() => {
        const fetchUserType = async () => {
            // setUserType(await Api.getUserType(token));  // TODO: enable this after development
            setUserType('teacher');
        };

        fetchUserType();
    }, []);

    if (token === undefined) {
        // TODO: uncomment after development
        // return (
        //     <div className={ loginRedirectClassName }>
        //         <TreeIcon />
        //         <h1>You have to log in to use this website!</h1><br/>
        //         <h1>Redirecting...</h1>
        //         <DelayedRedirect to="/login" delay={ 3500 }/>
        //     </div>
        // )
    }

    return (
        <div>
            { userType === 'student' && <StudentsPage token={ token } darkMode={ darkMode } setDarkMode={ setDarkMode }
                                                      snowFlakes={ snowFlakes } setSnowFlakes={ setSnowFlakes } /> }
            { userType === 'teacher' && <TeacherPage darkMode={ darkMode } setDarkMode={ setDarkMode }
                                                     snowFlakes={ snowFlakes } setSnowFlakes={ setSnowFlakes } /> }
            { userType === undefined && <div>Hello There!</div> /* TODO: handle this error */ }

            { snowFlakes && <SnowFlakes /> }
        </div>
    )
}

export { Home };
