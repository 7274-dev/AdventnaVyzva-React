import { makeAuthenticatedRequest } from './makeAuthenticatedRequest';

const fetchHomeworkById = async (token, id) => {
    return await makeAuthenticatedRequest(`/api/homework/admin?homeworkId=${id}`, token, {
        method: 'GET'
    });
}

const queryHomeworkByName = async (token, query) => {
    return await makeAuthenticatedRequest(`/api/search/homework/any?query=${!query ? '' : query}`, token, {
        method: 'GET'
    });
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

export {
    fetchHomeworkById,
    queryHomeworkByName,
    createNewHomework,
    deleteHomework,
    editHomework
};