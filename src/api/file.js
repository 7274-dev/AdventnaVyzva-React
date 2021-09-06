import { makeAuthenticatedRequest } from './makeAuthenticatedRequest';

const uploadFile = async (token, filename, data) => {
    return await makeAuthenticatedRequest('/api/file/upload', token, {
        method: 'POST',
        body: JSON.stringify({
            filename: filename,
            data: data
        })
    });
}

const downloadFile = async (token, fileId) => {
    return await makeAuthenticatedRequest(`/api/file/download&fileId=${fileId}`,
        token, { method: 'GET' });
}

export {
    uploadFile,
    downloadFile
};
