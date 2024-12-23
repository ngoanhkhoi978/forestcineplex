import { get } from '~/services/apiService.js';

export const fetchReviewMovie = async (movieId) => {
    try {
        const res = await get(`/ratings/review-information/${movieId}`);

        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};
