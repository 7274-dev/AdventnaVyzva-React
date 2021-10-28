import { backendUrl } from './index';

const makeAuthenticatedRequest = (uri, token, requestInit) => {
    return fetch(`${backendUrl}${uri}`, {
        ...requestInit,
        headers: {
            'token': token,
            'Content-Type': 'application/json',
            ...requestInit?.headers
        }
    });
}

export { makeAuthenticatedRequest }
