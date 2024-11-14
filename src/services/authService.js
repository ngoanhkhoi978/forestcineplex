import { get, post } from './apiService';

export const login = async (credentials) => {
    try {
        const res = await post('/auth/login', credentials, { withCredentials: true });
        return { success: true, user: res.data };
    } catch (err) {
        return { success: false, ...err.response.data };
    }
};

export const verifyToken = async () => {
    try {
        const res = await get('/auth/verify-token', { withCredentials: true });
        return { success: true, user: res.data };
    } catch (err) {
        return { success: false, ...err.response.data };
    }
};

export const logout = () => {};

export const register = (userData) => {
    return post('/auth/register', userData);
};
