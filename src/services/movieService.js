import { get } from './apiService';
import config from '~/config/index.js';

export const fetchMovies = () => {
    return get('/movies');
};

export const fetchMovieById = (id) => {
    return get(`/movies/${id}`);
};

export const fetchRandomMovie = async (size) => {
    try {
        const res = await get(`/movies/random?size=${size}`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const fetchMoviesWithGenre = async (genre, limit, index, isSeries = null) => {
    try {
        const res = await get(
            `/movies/genre/${genre}?limit=${limit ?? ''}&index=${index ?? ''}&isSeries=${isSeries === null ? '' : isSeries}`,
        );
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const searchMovies = async (filter) => {
    try {
        const res = await get(
            `/movies/search/?title=${filter.title ?? ''}&genre=${filter.genre ?? ''}&cast=${filter.cast ?? ''}&director=${filter.director ?? ''}`,
        );
        return res.data;
    } catch (e) {
        // console.log(e);
        throw e;
    }
};

export const getFullMediaUrl = (mediaId) => `${config.baseURL}/api/movies/media/${mediaId}/${mediaId}_master.m3u8`;
