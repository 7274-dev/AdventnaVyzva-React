import { makeAuthenticatedRequest } from './makeAuthenticatedRequest';

const fetchHomeworkById = async (token, id) => {
    return await makeAuthenticatedRequest(`/api/homework?homeworkId=${id}`, token, {
        method: 'GET'
    });
}

const fetchHomeworkByUserId = async (token, studentId) => {
    return await makeAuthenticatedRequest(`/api/homework/student?userId=${studentId}`, token, {
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

const isDone = async (token, homeworkId, userId) => {
    return await makeAuthenticatedRequest(`/api/homework/done?userId=${userId}&homeworkId=${homeworkId}`, token, {
        method: 'GET'
    });
}

const doesHomeworkHaveBall = async (token, homeworkId) => {
    return await makeAuthenticatedRequest(`/api/homework/balls?homeworkId=${homeworkId}`, token, {
        method: 'GET'
    });
}

const createHomeworkBall = async (token, homeworkId) => {
    return await makeAuthenticatedRequest(`/api/homework/balls?homeworkId=${homeworkId}`, token, {
        method: 'PUT'
    });
}

const deleteBallByHomeworkId = async (token, ballId) => {
    return await makeAuthenticatedRequest(`/api/homework/balls/homework?ballId=${ballId}`, token, {
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

const submitHomework = async (token, content, fileIds, homeworkId) => {
    return await makeAuthenticatedRequest('/api/homework/submissions', token, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: content,
            fileIds: fileIds,
            homeworkId: homeworkId
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

const getAllSubmissions = async (token, homeworkId) => {
    return await makeAuthenticatedRequest(`/api/homework/submissions?homeworkId=${homeworkId}`, token, {
        method: 'GET'
    });
}

const addFeedbackToHomeworkSubmission = async (token, submissionId, feedback, message) => {
    return await makeAuthenticatedRequest(`/api/homework/feedback?submissionId=${submissionId}`, token, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            feedback: feedback ? 'OK' : 'NO',
            message: message
        })
    });
}

const getFeedbackForSubmission = async (token, homeworkId) => {
    return await makeAuthenticatedRequest(`/api/homework/feedback?homeworkId=${homeworkId}`, token, {
        method: 'GET'
    });
}

export {
    fetchHomeworkById,
    fetchHomeworkByUserId,
    isDone,
    queryHomeworkByName,
    createNewHomework,
    deleteHomework,
    editHomework,
    submitHomework,
    doesHomeworkHaveBall,
    addAttachment,
    getAttachments,
    createHomeworkBall,
    deleteBallByHomeworkId,
    getAllSubmissions,
    addFeedbackToHomeworkSubmission,
    getFeedbackForSubmission
}
