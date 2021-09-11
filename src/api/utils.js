import { makeAuthenticatedRequest } from './makeAuthenticatedRequest';

const getUserType = async (token) => {
    return await makeAuthenticatedRequest('/type', token, {
        method: 'GET'
    });
}

const markdownToHtml = async (token, markdown) => {
    return await makeAuthenticatedRequest(`/api/homework/mdtohtml`, token, {
        method: 'POST',
        body: JSON.stringify({
            markdown: markdown
        })
    })
}

export {
    getUserType,
    markdownToHtml
};
