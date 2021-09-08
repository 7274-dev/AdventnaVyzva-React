import { makeAuthenticatedRequest } from './makeAuthenticatedRequest';
import { sha512, backendUrl } from './index';


const login = async (username, password) => {
    console.log(`sha512: ${sha512(password)}`);
    return await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'username': username,
            'password': sha512(password)
        }
    });
}

const logout = async (token) => {
    return await makeAuthenticatedRequest('/logout', token, {
        method: 'POST'
    });
}

export {
    login,
    logout
};
