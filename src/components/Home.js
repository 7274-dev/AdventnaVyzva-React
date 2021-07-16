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

const Home = ({ token, darkMode, setDarkMode, snowflakes, setSnowflakes }) => {
    const [userType, setUserType] = useState(undefined);
    const [isUserTypeLoading, setIsUserTypeLoading] = useState(true);

    useEffect(() => {
        const fetchUserType = async () => {
            // TODO code: cover 'Bad token' case
            setUserType(await Api.getUserType(token));  // TODO code: enable this after development
            // setUserType('teacher');
            setIsUserTypeLoading(false);
        };

        fetchUserType();
    }, []);

    const loginRedirectClassName = useTheme('login-redirect');

    const isUserTypeUndefinedWhileIsUserTypeLoading = userType === undefined && isUserTypeLoading;
    const isUserTypeUndefinedWhileIsUserTypeNotLoading = userType === undefined && !isUserTypeLoading;

    const homeClassName = useTheme('home');

    if (['undefined', undefined].includes(token)) {
        // TODO code: uncomment after development
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
            { isUserTypeUndefinedWhileIsUserTypeLoading && <Loading /> }
            { isUserTypeUndefinedWhileIsUserTypeNotLoading && <SomethingWentWrong /> }

            <SnowFlakes snowflakes={ snowflakes } />
        </div>
    )
}

export { Home };
