import { useEffect, useState} from 'react';
import { useTheme } from '../App';
import { TeacherPage } from './TeacherPage';
import { StudentsPage } from './StudentsPage';
import { SnowFlakes } from './SnowFlakes';
import { DelayedRedirect } from './DelayedRedirect';
import * as Api from '../Api';
import { ReactComponent as TreeIcon } from '../images/tree.svg';  // maybe change this tree?
import '../styles/Home.css';

const SomethingWentWrong = () => {
    return (
        <div className="something-went-wrong">
            <h1>Oh no! Something must have went wrong...</h1>
            <h2>Try restarting the page, if the problem remains contact us here:</h2>
            <h2>seven.two.seven.four.dev@gmail.com</h2>
        </div>
    )
}

const Home = ({ token, darkMode, setDarkMode, snowFlakes, setSnowFlakes }) => {
    const [userType, setUserType] = useState(undefined);
    const [isUserTypeLoading, setIsUserTypeLoading] = useState(true);

    useEffect(() => {
        const fetchUserType = async () => {
            // setUserType(await Api.getUserType(token));  // TODO: enable this after development
            setUserType(undefined);
        };

        fetchUserType();
    }, []);

    useEffect(() => {

    }, [userType]);

    const loginRedirectClassName = useTheme("login-redirect");

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
            { userType === undefined && <SomethingWentWrong /> /* TODO: handle this error */ }

            { snowFlakes && <SnowFlakes /> }
        </div>
    )
}

export { Home };
