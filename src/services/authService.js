import { get, post } from './apiService';

export const login = (credentials) => {
    return post('/auth/login', credentials);
};

export const logout = () => {
    // Thực hiện logout, có thể là xóa token ở localStorage
};

export const register = (userData) => {
    return post('/auth/register', userData);
};
