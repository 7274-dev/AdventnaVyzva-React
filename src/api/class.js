import { makeAuthenticatedRequest } from './makeAuthenticatedRequest';

const getAllClasses = async (token) => {
    return await makeAuthenticatedRequest('/api/class', token, {});
}

const getClassById = async (token, id) => {
    // TODO backend: make mapping for me
    return await makeAuthenticatedRequest(`/api/class?classId=${id}`, token, {
        method: 'GET'
    });
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

const createClass = async (token, className) => {
    return await makeAuthenticatedRequest(`/api/class?className=${className}`, token, {
        method: 'PUT'
    });
}

export { getAllClasses, addUserToClass, createClass, getClassById }
