import { makeAuthenticatedRequest } from './makeAuthenticatedRequest';
import { sha512 } from '.';

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

export {
    createTeacherAccount,
    deleteTeacherAccount,
    changeTeachersPassword
}
