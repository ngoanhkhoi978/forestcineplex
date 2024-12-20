import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserFavouriteMovies } from './favouriteThunk.js';

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState: {
        favoriteMovies: [],
        loading: false,
        error: null,
    },
    reducers: {
        setFavoriteMovies: (state, action) => {
            state.favoriteMovies = action.payload;
        },

        addFavoriteMovie: (state, action) => {
            state.favoriteMovies.push(action.payload);
        },

        deleteFavoriteMovie: (state, action) => {
            state.favoriteMovies = state.favoriteMovies.filter((favorite) => favorite.movieId._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserFavouriteMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserFavouriteMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.favoriteMovies = action.payload;
            })
            .addCase(getUserFavouriteMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch favorite movies.';
            });
    },
});

export const { setFavoriteMovies, addFavoriteMovie, deleteFavoriteMovie } = favoriteSlice.actions;
export default favoriteSlice.reducer;
