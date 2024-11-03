import { get } from './apiService';

export const fetchMovies = () => {
    return get('/movies');
};

export const fetchMovieById = (id) => {
    return get(`/movies/${id}`);
};
