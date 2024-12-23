import { del, get, post, put } from '~/services/apiService.js';

export const choosePlan = async (plan) => {
    try {
        const res = await post(`/me/subscription-plan/choose`, { subscriptionPlan: plan });
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const rateMovie = async (movieId, score) => {
    try {
        const res = await post(`/me/rate-movie`, { movieId, score });
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const getRatingMovie = async (movieId) => {
    try {
        const res = await get(`/me/rating-movie/${movieId}`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const addFavouriteMovie = async (movieId) => {
    try {
        const res = await post(`/me/favourite-movie/${movieId}`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const deleteFavouriteMovie = async (movieId) => {
    try {
        const res = await del(`/me/favourite-movie/${movieId}`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const modifyProfile = async (userData) => {
    try {
        const res = await put(`/me/profile`, userData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const changePassword = async (data) => {
    try {
        const res = await put(`/me/profile/change-password`, data);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};
