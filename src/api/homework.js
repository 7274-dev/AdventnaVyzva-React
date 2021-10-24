import { makeAuthenticatedRequest } from './makeAuthenticatedRequest';

const fetchHomeworkById = async (token, id) => {
    return await makeAuthenticatedRequest(`/api/homework/?homeworkId=${id}`, token, {
        method: 'GET'
    });
}

// TODO: backend: fix me
const fetchHomeworkByUserId = async (token, studentId) => {
    return await makeAuthenticatedRequest(`/api/homework/student?studentId=${studentId}`, token, {
        method: 'GET'
    });
}

const queryHomeworkByName = async (token, query) => {
    return await makeAuthenticatedRequest(`/api/search/homework/any?query=${!query ? '' : query}`, token, {
        method: 'GET'
    });
}

const createNewHomework = async (token, classId, title, text, due, fromDate) => {
    return await makeAuthenticatedRequest('/api/homework/', token, {
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

const submitHomework = async (token, content, fileIds) => {
    return await makeAuthenticatedRequest('/api/homework/submissions', token, {
        method: 'POST',
        body: JSON.stringify({
            content: content,
            fileIds: fileIds
        })
    });
}

const addAttachment = async (token, homeworkId, fileId) => {
    // FIXME
    return await makeAuthenticatedRequest('/api/homework/attachment', token, {
        method: 'POST',
        body: JSON.stringify({
            homeworkId: homeworkId,
            fileId: fileId
        })
    });
}

export {
    fetchHomeworkById,
    fetchHomeworkByUserId,
    queryHomeworkByName,
    createNewHomework,
    deleteHomework,
    editHomework,
    submitHomework,
    addAttachment
}
