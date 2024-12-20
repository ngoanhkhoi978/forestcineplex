import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFavouriteMovies } from '~/services/favouriteService.js';

export const getUserFavouriteMovies = createAsyncThunk('', async (userId, thunkAPI) => {
    try {
        const list = await fetchFavouriteMovies(userId);
        return list;
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
});
