import { backendUrl } from "./index";

const makeAuthenticatedRequest = (uri, token, requestInit) => {
    return fetch(`${backendUrl}${uri}`, {
        ...requestInit,
        headers: {
            'token': token,
            ...requestInit?.headers
        }
    });
}

export { makeAuthenticatedRequest };
