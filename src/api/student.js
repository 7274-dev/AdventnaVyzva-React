import { isDefined } from '../hooks/isDefined';
import { makeAuthenticatedRequest } from './makeAuthenticatedRequest';
import { sha512 } from '.';

const fetchStudentById = async (token, id) => {
    if (!isDefined(id)) {
        throw new Error('ID is undefined');
    }

    return await makeAuthenticatedRequest(`/api/admin/student?studentId=${id}`, token, {
        method: 'GET'
    });
}

const queryStudentByName = async (token, query) => {
    return await makeAuthenticatedRequest(`/api/search/user?query=${!query ? '' : query}`, token, {
        method: 'GET'
    })
}

const createStudentAccount = async (token, username, password, name) => {
    return await makeAuthenticatedRequest('/api/admin/student', token, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            username: username,
            password: sha512(password)
        })
    });
}

const deleteStudentAccount = async (token, userId) => {
    return await makeAuthenticatedRequest(`/api/admin/student&userId=${userId}`, token, {
            method: 'DELETE'
    });
}

const changeStudentPassword = async (token, userId, password) => {
    return await makeAuthenticatedRequest(`/api/admin/student?userId=${userId}&newPassword=${sha512(password)}`, token, {
        method: 'PATCH'
    });
}

export {
    fetchStudentById,
    queryStudentByName,
    createStudentAccount,
    deleteStudentAccount,
    changeStudentPassword
}
