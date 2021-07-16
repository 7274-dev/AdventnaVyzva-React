import { useState, useEffect } from 'react';
import { useTheme } from '../App';
import { TeacherPage } from './TeacherPage/TeacherPage';
import { StudentsPage } from './StudentsPage';
import { SnowFlakes } from './SnowFlakes';
import { Loading } from './Loading';
import { DelayedRedirect } from './DelayedRedirect';
import { SomethingWentWrong } from './SomethingWentWrong';
import { ReactComponent as TreeIcon } from '../images/tree.svg';  // maybe change this tree?
import * as Api from '../Api';
import '../styles/Home.css';

const Home = ({ token, setToken, darkMode, setDarkMode, snowflakes, setSnowflakes }) => {
    const [userType, setUserType] = useState(undefined);

    useEffect(() => {
        const fetchUserType = async () => {
            // TODO code: cover 'Bad token' case
            const response = await Api.getUserType(token);
            const fetchedUserType = (await response.json()).response

            if (response.status === 200 && ['admin', 'student', 'teacher'].includes(fetchedUserType)) {
                setUserType(fetchedUserType);
            }
            else if (fetchedUserType === 'Bad token') {
                // token is not working (user needs to login again)
                setToken(undefined);
            }
            else {
                setUserType('SomethingWentWrong');
            }
        };

        setUserType('Loading');
        fetchUserType();
    }, [setToken, token]);

    const loginRedirectClassName = useTheme('login-redirect');

    const homeClassName = useTheme('home');

    // login redirect
    if (['undefined', undefined].includes(token)) {
        return (
            <div className={ loginRedirectClassName }>
                <TreeIcon />
                <h1>You have to log in to use this website!</h1><br/>
                <h1>Redirecting...</h1>
                <DelayedRedirect to='/login' delay={ 2500 }/>
            </div>
        )
    }

    return (
        <div className={ homeClassName }>
            { userType === 'student' && <StudentsPage token={ token } darkMode={ darkMode } setDarkMode={ setDarkMode }
                                                      snowFlakes={ snowflakes } setSnowFlakes={ setSnowflakes } /> }
            { ['teacher', 'admin'].includes(userType) && <TeacherPage darkMode={ darkMode } setDarkMode={ setDarkMode }
                                                                      snowflakes={ snowflakes } setSnowflakes={ setSnowflakes } /> }
            { userType === 'Loading' && <Loading /> }
            { userType === 'SomethingWentWrong' && <SomethingWentWrong h2MarginTop='-1rem' /> }

            <SnowFlakes snowflakes={ snowflakes } />
        </div>
    )
}

export { Home };
