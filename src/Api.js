// noinspection JSUnusedGlobalSymbols

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

    return (await response.json()).response;  // this request can only fail if we have a bad token
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
    // TODO: force backend devs to make mapping for this (if doesn't exist)

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
    const response = await makeAuthenticatedRequest(`/api/admin/student&userId=${userId}`, token,
        { method: 'DELETE' });

    return !response.ok ? null : (await response.json()).response;
}

const changeStudentPassword = async (token, userId, password) => {
    const response = await makeAuthenticatedRequest(
        `/api/admin/student&userId=${userId}&newPassword=${sha512(password)}`,
        token, { method: 'PATCH' });

    return !response.ok ? null : (await response.json()).response;
}

const createTeacherAccount = async (token, username, password, name) => {
    const response = await makeAuthenticatedRequest("/api/admin/teacher", token, {
        method: 'PUT',
        headers: {
            name: name,
            username: username,
            password: sha512(password)
        }
    });

    return !response.ok ? null : (await response.json()).response;
}

const deleteTeacherAccount = async (token, userId) => {
    const response = await makeAuthenticatedRequest(`/api/admin/teacher&userId=${userId}`, token,
        { method: 'DELETE' });

    return !response.ok ? null : (await response.json()).response;
}

const changeTeachersPassword = async (token, userId, password) => {
    const response = await makeAuthenticatedRequest(
        `/api/admin/teacher&userId=${userId}&newPassword=${sha512(password)}`,
        token, { method: 'PATCH' });

    return !response.ok ? null : (await response.json()).response;
}

const createNewHomework = async (token, classId, title, text, due, fromDate) => {
    const response = await makeAuthenticatedRequest("/api/homework", token, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classId: classId,
            title: title,
            text: text,
            due: due,
            fromDate: fromDate
        })
    });

    return !response.ok ? null : (await response.json()).response;
}

const deleteHomework = async (token, homeworkId) => {
    const response = await makeAuthenticatedRequest(`/api/homework&homeworkId=${homeworkId}`,
        token, { method: 'DELETE' });

    return !response.ok ? null : (await response.json()).response;
}

const editHomework = async (token, homeworkId, classId, title, text, due, fromDate) => {
    const response = await makeAuthenticatedRequest("/api/homework", token, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            homeworkId: homeworkId,
            classId: classId,
            title: title,
            text: text,
            due: due,
            fromDate: fromDate
        })
    });

    return !response.ok ? null : (await response.json()).response;
}

const uploadFile = async (token, filename, data) => {
    const response = await makeAuthenticatedRequest("/api/file/upload", token, {
        method: 'POST',
        body: JSON.stringify({
            filename: filename,
            data: data
        })
    });

    return !response.ok ? null : (await response.json()).response;
}

const downloadFile = async (token, fileId) => {
    const response = await makeAuthenticatedRequest(`/api/file/download&fileId=${fileId}`,
        token, { method: 'GET' });

    return !response.ok ? null : (await response.json()).response;
}

const getHomeworkForClass = async (token, classId) => {
    const response = await makeAuthenticatedRequest(`/api/homework/class&classId=${classId}`,
        token, { method: 'GET' });

    return !response.ok ? null : (await response.json()).response;
}

const getHomeworkForDate = async (token, classId, date) => {
    const response = await makeAuthenticatedRequest(`/api/homework/date&classId=${classId}&date=${date}`,
        token, { method: 'GET' });

    return !response.ok ? null : (await response.json()).response;
}

const getClassWithSubstring = async (token, query) => {
    const response = await makeAuthenticatedRequest(`/api/search/class&query=${query}`,
        token, { method: 'GET' });

    return !response.ok ? null : (await response.json()).response;
}

const getHomeworkWithSubstringInTitle = async (token, query) => {
    const response = await makeAuthenticatedRequest(`/api/search/homework/title&query=${query}`,
        token, { method: 'GET' });

    return !response.ok ? null : (await response.json()).response;
}

const getHomeworkWithSubstringInText = async (token, query) => {
    const response = await makeAuthenticatedRequest(`/api/search/homework/text&query=${query}`,
        token, { method: 'GET' });

    return !response.ok ? null : (await response.json()).response;
}

const getHomeworkWithSubstring = async (token, query) => {
    const response = await makeAuthenticatedRequest(`/api/search/homework/any&query=${query}`,
        token, { method: 'GET' });

    return !response.ok ? null : (await response.json()).response;
}

export {
    login, logout, searchUsers, getUserType, createStudentAccount, deleteStudentAccount, changeStudentPassword,
    createTeacherAccount, deleteTeacherAccount, changeTeachersPassword, createNewHomework, deleteHomework,
    editHomework, uploadFile, downloadFile, getHomeworkForClass, getHomeworkForDate, getClassWithSubstring,
    getHomeworkWithSubstringInTitle, getHomeworkWithSubstringInText, getHomeworkWithSubstring,
};
