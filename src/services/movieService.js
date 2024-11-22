import { get } from './apiService';
import config from '~/config/index.js';

export const fetchMovies = () => {
    return get('/movies');
};

export const fetchMovieById = (id) => {
    return get(`/movies/${id}`);
};

export const fetchRandomMovie = async () => {
    try {
        const res = await get('/movies/random');
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const fetchMoviesWithGenre = async (genre, limit, index) => {
    try {
        const res = await get(`/movies/genre/${genre}?limit=${limit}&index=${index}`);
        return res.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const getFullMediaUrl = (mediaId) => `${config.baseURL}/api/movies/media/${mediaId}/${mediaId}.m3u8`;
