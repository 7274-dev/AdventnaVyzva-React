import { makeAuthenticatedRequest } from './makeAuthenticatedRequest';

const fetchHomeworkById = async (token, id) => {
    return await makeAuthenticatedRequest(`/api/homework?homeworkId=${id}`, token, {
        method: 'GET'
    });
}

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

const createHomeworkBall = async (token, homeworkId) => {
    return await makeAuthenticatedRequest(`/api/homework/balls?homeworkId=${homeworkId}`, token, {
        method: 'PUT'
    });
}

const deleteBallByHomeworkId = async (token, homeworkId) => {
    return await makeAuthenticatedRequest(`/api/homework/balls/homework?homeworkId=${homeworkId}`, token, {
        method: 'DELETE'
    })
}

const deleteHomework = async (token, homeworkId) => {
    return await makeAuthenticatedRequest(`/api/homework?homeworkId=${homeworkId}`, token, {
        method: 'DELETE'
    });
}

const editHomework = async (token, homeworkId, homework) => {
    return await makeAuthenticatedRequest(`/api/homework?homeworkId=${homeworkId}`, token, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(homework)
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
    return await makeAuthenticatedRequest('/api/homework/attachment', token, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            homeworkId: homeworkId,
            fileId: fileId
        })
    });
}

const getAttachments = async (token, homeworkId) => {
    return await makeAuthenticatedRequest(`/api/homework/attachment?homeworkId=${homeworkId}`, token, {
        method: 'GET'
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
    addAttachment,
    getAttachments,
    createHomeworkBall,
    deleteBallByHomeworkId
}
