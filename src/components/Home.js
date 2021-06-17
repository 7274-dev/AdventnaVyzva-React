import { useEffect, useState} from 'react';
import { useTheme } from '../App';
import { TeacherPage } from './TeacherPage';
import { StudentsPage } from './StudentsPage';
import { SnowFlakes } from './SnowFlakes';
import { Loading } from './Loading';
import { DelayedRedirect } from './DelayedRedirect';
import * as Api from '../Api';
import { ReactComponent as TreeIcon } from '../images/tree.svg';  // maybe change this tree?
import '../styles/Home.css';

const SomethingWentWrong = () => {
    const somethingWentWrongClassName = useTheme('something-went-wrong');

    return (
        <div className={ somethingWentWrongClassName }>
            <h1>Oh no! Something went wrong...</h1>
            <h2>Try restarting the page, if the problem remains, please contact us on:</h2>
            <h2>seven.two.seven.four.dev@gmail.com</h2>
        </div>
    )
}

const Home = ({ token, darkMode, setDarkMode, snowFlakes, setSnowFlakes }) => {
    const [userType, setUserType] = useState(undefined);
    const [isUserTypeLoading, setIsUserTypeLoading] = useState(true);

    useEffect(() => {
        const fetchUserType = async () => {
            // setUserType(await Api.getUserType(token));  // TODO code: enable this after development
            setUserType('student');
            setIsUserTypeLoading(false);
        };

        fetchUserType();
    }, []);

    const loginRedirectClassName = useTheme("login-redirect");

    if (token === undefined) {
        // TODO code: uncomment after development
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
            { userType === undefined && isUserTypeLoading && <Loading /> }
            { userType === undefined && !isUserTypeLoading && <SomethingWentWrong /> }

            { snowFlakes && <SnowFlakes /> }
        </div>
    )
}

export { Home };
