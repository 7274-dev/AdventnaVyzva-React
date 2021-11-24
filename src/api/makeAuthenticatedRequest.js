import { redirectMeTo } from '../components';
import { backendUrl } from './index';

let setToken = () => {}

const setSetToken = (setToken_) => {
    setToken = setToken_;
}

const makeAuthenticatedRequest = async (uri, token, requestInit) => {
    let response = null;

    try {
        response = await fetch(`${backendUrl}${uri}`, {
            ...requestInit,
            headers: {
                'token': token,
                ...requestInit?.headers
            }
        });

        if (response?.status === 401 && (await response.clone().json()).response !== 'No such user') {
            setToken(undefined);
        }
    }
    catch (err) {
        if (!response) {
            redirectMeTo('/serverisdown');
        }

        console.log(`Error caught while sending authenticated request to ${uri} with args ${token} and ${requestInit}`)
        console.log(err)
        throw err;
    }

    return response;
}

export { setSetToken, makeAuthenticatedRequest }
