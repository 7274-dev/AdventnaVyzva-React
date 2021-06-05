/* eslint-disable */
// noinspection ES6UnusedImports,JSUnusedLocalSymbols

import { useEffect, useState} from "react";
import { TeacherPage } from './TeacherPage';
import { StudentsPage } from './StudentsPage';
import { DelayedRedirect } from './DelayedRedirect';
import * as Api from '../Api';
import { ReactComponent as TreeIcon } from '../images/tree.svg';
import '../styles/Login.css';

const Home = ({ token, useTheme, darkMode, setDarkMode }) => {
    const [userType, setUserType] = useState(undefined);

    if (token === undefined) {
        // return (
        //     <div className={ getClassNameByTheme("login-redirect") }>
        //         <TreeIcon />
        //         <h1>You have to log in to use this website!</h1><br/>
        //         <h1>Redirecting...</h1>
        //         <DelayedRedirect to="/login" delay={ 3500 }/>
        //     </div>
        // )
    }

    // eslint-disable-next-line
    useEffect(() => {
        const fetchUserType = async () => {
            // setUserType(await Api.getUserType(token));  // TODO: enable this after debugging
            setUserType('student');  // TODO: remove this after debugging
        };

        // noinspection JSIgnoredPromiseFromCall
        fetchUserType();
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            { userType === 'student' && <StudentsPage token={ token } useTheme={ useTheme }
                                                      darkMode={ darkMode } setDarkMode={ setDarkMode } /> }
            { userType === 'teacher' && <TeacherPage /> }
            { userType === undefined && <div>well shit</div> }
        </div>
    )
}

export { Home };
