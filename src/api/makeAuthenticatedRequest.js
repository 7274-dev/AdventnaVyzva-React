import { redirectMeTo } from '../components';
import { backendUrl } from './index';

let setToken = () => {}

const setSetToken = (setToken_) => {
    setToken = setToken_;
}

const makeAuthenticatedRequest = async (uri, token, requestInit) => {
    let response;

    try {
        response = await fetch(`${backendUrl}${uri}`, {
            ...requestInit,
            headers: {
                'token': token,
                ...requestInit?.headers
            }
        });
    }
    catch (err) {
        if (!response) {
            redirectMeTo('/serverisdown', 0, true);
        }
        else if (response.status === 401) {
            setToken(undefined);
        }

        throw err;
    }

    return response;
}

export { setSetToken, makeAuthenticatedRequest }
