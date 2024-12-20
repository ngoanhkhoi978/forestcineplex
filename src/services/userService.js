import { get, post } from './apiService.js';

export const login = async (credentials) => {
    try {
        const res = await post('/auth/login', credentials, { withCredentials: true });
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const verifyToken = async () => {
    try {
        const res = await get('/auth/verify-token', {
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
