import { makeAuthenticatedRequest } from './makeAuthenticatedRequest';

const getAllClasses = async (token) => {
    return await makeAuthenticatedRequest('/api/class', token, {});
}

const getClassById = async (token, id) => {
    return await makeAuthenticatedRequest(`/api/class/id?classId=${id}`, token, {
        method: 'GET'
    });
}

const addUserToClass = async (token, classId, userId) => {
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

const deleteClass = async (token, classId) => {
    return await makeAuthenticatedRequest(`/api/class?classId=${classId}`, token, {
        method: 'DELETE'
    });
}

const editClass = async (token, className, classId) => {
    return await makeAuthenticatedRequest(`/api/class?classId=${classId}&className=${className}`, token, {
        method: 'PATCH'
    });
}

const getAllStudentsInClass = async (token, classId) => {
    return await makeAuthenticatedRequest(`/api/class/member?classId=${classId}`, token, {
        method: 'GET'
    });
}

const removeStudentFromClass = async (token, classId, userId) => {
    return await makeAuthenticatedRequest(`/api/class/member`, token, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            classId: classId,
            userId: userId
        })
    });
}

const getMissingStudentsInClass = async (token, classId) => {
    return await makeAuthenticatedRequest(`/api/class/member/notinclass?classId=${classId}`, token, {
        method: 'GET'
    });
}

export { getAllClasses, addUserToClass, createClass, getClassById, deleteClass, editClass, getAllStudentsInClass, removeStudentFromClass, getMissingStudentsInClass }
