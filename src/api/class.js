import { makeAuthenticatedRequest } from './makeAuthenticatedRequest';

const getAllClasses = async (token) => {
    return await makeAuthenticatedRequest('/api/class', token, {});
}

const addUserToClass = async (token, userId, classId) => {
    return await makeAuthenticatedRequest('/api/class/member', token, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            classId
        })
    });
}

export { getAllClasses, addUserToClass }
