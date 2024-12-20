import { del, get, post } from './apiService.js';

export const fetchFavouriteMovies = async (userId) => {
    try {
        const res = await get(`/favourites/${userId}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const addFavouriteMovie = async (userId, movieId) => {
    try {
        const res = await post(`/favourites/${userId}/${movieId}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const removeFavouriteMovie = async (userId, movieId) => {
    try {
        const res = await del(`/favourites/${userId}/${movieId}`);
        return res.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
};
