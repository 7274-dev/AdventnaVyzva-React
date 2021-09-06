import { makeAuthenticatedRequest } from './makeAuthenticatedRequest';
import { sha512 } from '.';

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

export {
    createStudentAccount,
    deleteStudentAccount,
    changeStudentPassword
};
