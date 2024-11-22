import { get } from './apiService';

export const fetchGenres = async () => {
    try {
        const res = await get('/genres');
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};
