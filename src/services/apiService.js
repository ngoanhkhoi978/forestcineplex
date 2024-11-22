import axios from 'axios';
import config from '~/config/index.js';

const api = axios.create({
    baseURL: `${config.baseURL}/api`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const get = (url, config = {}) => api.get(url, config).catch();
export const post = (url, data, config = {}) => api.post(url, data, config);
export const patch = (url, data, config = {}) => api.patch(url, data, config);
export const put = (url, data, config = {}) => api.put(url, data, config);
export const del = (url, config = {}) => api.delete(url, config);
