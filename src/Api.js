// import cookie from 'react-cookies';

const backendUrl = 'http://localhost:8080';

// do not export this
const makeAuthenticatedRequest = (uri, requestInit, token) => { 
    return fetch(`${backendUrl}${uri}`, {
        ...requestInit,
        headers: {
            'Token': token
        }
    });
}

const searchUsers = async (query, token) => {
    const response = await makeAuthenticatedRequest(`/api/search/user?query=${query}`, {}, token);

    return (await response.json()).response; // this request can only fail if we have a bad token
}

const login = async (username, password) => {
    const response = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'username': username,
            'password': password
        }
    });

    return !response.ok ? null : (await response.json()).response;
}

const logout = async (token) => {
    const response = await makeAuthenticatedRequest("/logout", { method: 'POST' }, token);

    return response.ok ? null : (await response.json()).response;
}

const getUserType = async (token) => {
    const response = await makeAuthenticatedRequest("/type", { method: 'GET' }, token);

    return !response.ok ? null : (await response.json()).response;
}

export { login, logout, searchUsers };
