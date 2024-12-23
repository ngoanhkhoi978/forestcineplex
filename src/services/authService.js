import { del, get, post } from './apiService';

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

export const logout = async () => {
    try {
        const res = await get('/auth/logout');
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const register = async (userData) => {
    try {
        const res = await post('/auth/register', userData);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const forgotPassword = async (identifier) => {
    try {
        const res = await post('/auth/forgot-password', { identifier });
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const resetPassword = async (data) => {
    try {
        const res = await post('/auth/reset-password', data);
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
