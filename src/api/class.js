import { makeAuthenticatedRequest } from './makeAuthenticatedRequest';

const getAllClasses = async (token) => {
    return await makeAuthenticatedRequest('/api/class', token, {});
}

export { getAllClasses }