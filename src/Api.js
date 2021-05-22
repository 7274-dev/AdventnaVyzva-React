const backendUrl = 'http://localhost:8080';

const sha512 = (text) => {
    return crypto.createHash('sha512').update(text).digest('hex');
}

// do not export this
const makeAuthenticatedRequest = (uri, token, requestInit) => {
    return fetch(`${backendUrl}${uri}`, {
        ...requestInit,
        headers: {
            'Token': token,
            ...requestInit?.headers
        }
    });
}

const searchUsers = async (query, token) => {
    const response = await makeAuthenticatedRequest(`/api/search/user?query=${query}`, token, {
        method: 'GET'
    });

    return (await response.json()).response; // this request can only fail if we have a bad token
}

const login = async (username, password) => {
    const response = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'username': username,
            'password': sha512(password)
        }
    });

    return !response.ok ? null : (await response.json()).response;
}

const logout = async (token) => {
    const response = await makeAuthenticatedRequest("/logout", token, {
        method: 'POST'
    });

    return response.ok ? null : (await response.json()).response;
}

const getUserType = async (token) => {
    // TODO: force backend devs to make mapping for this

    const response = await makeAuthenticatedRequest("/type", token, {
        method: 'GET'
    });

    return !response.ok ? null : (await response.json()).response;
}

const createStudentAccount = async (token, username, password, name) => {
    const response = await makeAuthenticatedRequest("/api/admin/student", token, {
        method: 'PUT',
        headers: {
            name: name,
            username: username,
            password: sha512(password)
        }
    });

    return !response.ok ? null : (await response.json()).response;
}

const deleteStudentAccount = async (token, userId) => {
    const response = await makeAuthenticatedRequest("/api/admin/student", token, {
        method: 'DELETE',
        headers: {
            userId: userId
        }
    });

    return !response.ok ? null : (await response.json()).response;
}

const changeStudentPassword = async (token, userId, password) => {
    const response = await makeAuthenticatedRequest("/api/admin/student", token, {
        method: 'PATCH',
        headers: {
            userId: userId,
            password: sha512(password)
        }
    });

    return !response.ok ? null : (await response.json()).response;
}

export {
    login, logout, searchUsers, getUserType, createStudentAccount, deleteStudentAccount, changeStudentPassword,
};
