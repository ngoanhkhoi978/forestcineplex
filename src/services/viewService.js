import { post } from '~/services/apiService.js';

export const incrementViews = async (movieId) => {
    try {
        const res = await post(`/views/${movieId}`);
        return res?.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};
