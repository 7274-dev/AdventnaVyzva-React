import { useState, useEffect } from 'react';
import { useTheme } from '../App';
import { StudentsPage } from './StudentsPage';
import { SnowFlakes } from './SnowFlakes';
import { Loading } from './Loading';
import { DelayedRedirect } from './DelayedRedirect';
import { SomethingWentWrong } from './SomethingWentWrong';
import { LoginRedirect } from './Login';
import * as Api from '../Api';
import '../styles/Home.css';

const Home = ({ token, setToken, darkMode, setDarkMode, snowflakes, setSnowflakes }) => {
    const [userType, setUserType] = useState('Loading');

    useEffect(() => {
        const fetchUserType = async () => {
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

        fetchUserType();
    }, [setToken, token]);

    const homeClassName = useTheme('home');

    if (['undefined', undefined].includes(token)) {
        return (
            <LoginRedirect />
        )
    }

    return (
        <div className={ homeClassName }>
            { userType === 'Loading' && <Loading /> }
            { userType === 'SomethingWentWrong' && <SomethingWentWrong h2MarginTop='-1rem' /> }

            { userType === 'student' && <StudentsPage token={ token } darkMode={ darkMode } setDarkMode={ setDarkMode }
                                                      snowFlakes={ snowflakes } setSnowFlakes={ setSnowflakes } /> }
            { ['teacher', 'admin'].includes(userType) && <DelayedRedirect to='/teacher' delay={ 0 } /> }

            <SnowFlakes snowflakes={ snowflakes } />
        </div>
    )
}

export { Home };
