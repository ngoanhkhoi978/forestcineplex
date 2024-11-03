import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.2.103:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get = (url, config = {}) => api.get(url, config);
export const post = (url, data, config = {}) => api.post(url, data, config);
export const patch = (url, data, config = {}) => api.patch(url, data, config);
export const put = (url, data, config = {}) => api.put(url, data, config);
export const del = (url, config = {}) => api.delete(url, config);
