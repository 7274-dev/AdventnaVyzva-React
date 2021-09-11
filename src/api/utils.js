import { makeAuthenticatedRequest } from './makeAuthenticatedRequest';
import { backendUrl } from '.';

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
    });
}

const test = async () => {
    return await fetch(`${backendUrl}/test`, {
        method: 'GET'
    });
}

export {
    getUserType,
    markdownToHtml,
    test
};
