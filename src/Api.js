// TODO code: check if all functions here are up-to-date and nothing is missing
// TODO code: clean up this file (maybe split functions into different files)

// api docs: https://github.com/7274-dev/AdventnaVyzva-GlobalBackend/wiki/Docs

import { sha512 } from 'js-sha512';

// TODO code: change to https when ready
const backendUrl = 'http://localhost:8080';

// do not export this
const makeAuthenticatedRequest = (uri, token, requestInit) => {
    return fetch(`${backendUrl}${uri}`, {
        ...requestInit,
        headers: {
            'token': token,
            ...requestInit?.headers
        }
    });
}

const login = async (username, password) => {
    return await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'username': username,
            'password': sha512(password)
        }
    });
}

const logout = async (token) => {
    return await makeAuthenticatedRequest('/logout', token, {
        method: 'POST'
    });
}

const getUserType = async (token) => {
    return await makeAuthenticatedRequest('/type', token, {
        method: 'GET'
    });
}

const createStudentAccount = async (token, username, password, name) => {
    return await makeAuthenticatedRequest('/api/admin/student', token, {
        method: 'PUT',
        headers: {
            name: name,
            username: username,
            password: sha512(password)
        }
    });
}

const deleteStudentAccount = async (token, userId) => {
    return await makeAuthenticatedRequest(`/api/admin/student&userId=${userId}`, token,
        { method: 'DELETE' });
}

const changeStudentPassword = async (token, userId, password) => {
    return await makeAuthenticatedRequest(
        `/api/admin/student?userId=${userId}&newPassword=${sha512(password)}`,
        token, { method: 'PATCH' });
}

const createTeacherAccount = async (token, username, password, name) => {
    return await makeAuthenticatedRequest('/api/admin/teacher', token, {
        method: 'PUT',
        headers: {
            name: name,
            username: username,
            password: sha512(password)
        }
    });
}

const deleteTeacherAccount = async (token, userId) => {
    return await makeAuthenticatedRequest(`/api/admin/teacher&userId=${userId}`, token,
        { method: 'DELETE' });
}

const changeTeachersPassword = async (token, userId, password) => {
    return await makeAuthenticatedRequest(
        `/api/admin/teacher&userId=${userId}&newPassword=${sha512(password)}`,
        token, { method: 'PATCH' });
}

const createNewHomework = async (token, classId, title, text, due, fromDate) => {
    return await makeAuthenticatedRequest('/api/homework', token, {
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
}

const deleteHomework = async (token, homeworkId) => {
    return await makeAuthenticatedRequest(`/api/homework&homeworkId=${homeworkId}`,
        token, { method: 'DELETE' });
}

const editHomework = async (token, homeworkId, classId, title, text, due, fromDate) => {
    return await makeAuthenticatedRequest('/api/homework', token, {
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
}

const uploadFile = async (token, filename, data) => {
    return await makeAuthenticatedRequest('/api/file/upload', token, {
        method: 'POST',
        body: JSON.stringify({
            filename: filename,
            data: data
        })
    });
}

const downloadFile = async (token, fileId) => {
    return await makeAuthenticatedRequest(`/api/file/download&fileId=${fileId}`,
        token, { method: 'GET' });
}

const makeGetRequest = async (token, uri) => {
    return await makeAuthenticatedRequest(uri, token, { method: 'GET' })
}

export {
    login, logout,
    getUserType,
    createStudentAccount, deleteStudentAccount, changeStudentPassword,
    createTeacherAccount, deleteTeacherAccount, changeTeachersPassword,
    createNewHomework, deleteHomework, editHomework,
    uploadFile, downloadFile,
    makeGetRequest
};
