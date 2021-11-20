import { makeAuthenticatedRequest } from './makeAuthenticatedRequest';

const uploadFile = async (token, data) => {
    return await makeAuthenticatedRequest('/api/file/upload', token, {
        method: 'POST',
        body: data
    });
}

const downloadFile = async (token, fileId) => {
    return await makeAuthenticatedRequest(`/api/file/download?fileId=${fileId}`, token, {
        method: 'GET'
    });
}

const getFileType = async (token, fileId) => {
    return await makeAuthenticatedRequest(`/api/file/type?fileId=${fileId}`, token, {
        method: 'GET'
    });
}

export {
    uploadFile,
    downloadFile,
    getFileType
}
