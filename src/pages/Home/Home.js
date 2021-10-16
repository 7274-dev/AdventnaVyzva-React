import { useState, useEffect } from 'react';
import { useTheme } from '../../App';
import { Loading } from '../../components';
import { SomethingWentWrong } from '../../components';
import { LoginRedirect } from '../Login/Login';
import * as Api from '../../api';
import { redirectMeTo } from '../../components';
import './Home.css';

const Home = ({ token, setToken }) => {
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const fetchUserType = async () => {
            try {
                const response = await Api.utils.getUserType(token);
                const fetchedUserType = (await response.json()).response;

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
            }
            catch (err) {
                // FIXME
                // redirectMeTo('/serverisdown');
            }
        }

        setTimeout(() => {
            fetchUserType().catch(() => {
                setUserType('SomethingWentWrong');

                // checks every 2 seconds if the problem isn't fixed
                const intervalID = setInterval(() => {
                    fetchUserType().then(r => clearInterval(intervalID));
                }, 5000);
            });
        }, 500);
    }, [setToken, token]);

    useEffect(() => {
        if (['admin', 'teacher'].includes(userType)) {
            redirectMeTo('/teacher');
        }
        else if (userType === 'student') {
            redirectMeTo('/student');
        }
    }, [userType]);

    const homeClassName = useTheme('home');

    if (['undefined', undefined].includes(token)) {
        return (
            <LoginRedirect />
        )
    }

    return (
        <div className={ homeClassName }>
            { userType === '' && <Loading /> }
            { userType === 'SomethingWentWrong' && <SomethingWentWrong h2MarginTop='-.5rem' /> }
        </div>
    )
}

export { Home }
