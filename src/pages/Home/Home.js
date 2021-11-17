import { useState, useEffect } from 'react';
import { Loading } from '../../components';
import { SomethingWentWrong } from '../../components';
import { redirectMeTo } from '../../components';
import * as Api from '../../api';

const Home = ({ token, setToken }) => {
    const [userType, setUserType] = useState('');

    useEffect(() => {
        const fetchUserType = async () => {
            const response = await Api.utils.getUserType(token);
            const body = await response.json();
            const fetchedUserType = body.response;

            if (response.status === 200 && ['admin', 'student', 'teacher'].includes(fetchedUserType)) {
                setUserType(fetchedUserType);
            }
            else if (fetchedUserType === 'Bad token') {
                // token is not working (user needs to login again)
                setToken(undefined);
            }
            else {
                console.log(response, fetchedUserType, body);
                setUserType('SomethingWentWrong');
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

    if (userType === '') {
        return <Loading />
    }
    return null;
}

export { Home }
