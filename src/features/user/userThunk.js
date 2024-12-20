import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, verifyToken } from '~/services/userService.js';

export const loginUser = createAsyncThunk('user/loginUser', async (credentials, thunkAPI) => {
    try {
        const user = await login(credentials);
        return user;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
});

export const verifyTokenUser = createAsyncThunk('user/verifyTokenUser', async (_, thunkAPI) => {
    try {
        const user = await verifyToken();
        return user;
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
});
