import { createAsyncThunk } from '@reduxjs/toolkit';
import { login, verifyToken } from '~/services/userService.js';
import { register } from '~/services/authService.js';

export const loginUser = createAsyncThunk('user/loginUser', async (credentials, thunkAPI) => {
    try {
        const user = await login(credentials);
        return user;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
});

export const registerUser = createAsyncThunk('user/register', async (userData, thunkAPI) => {
    try {
        const user = await register(userData);
        return user;
    } catch (err) {
        if (err.response?.data?.validators) {
            const errorObj = {};
            err.response.data.validators.forEach((error) => {
                if (errorObj[error.path]) {
                    errorObj[error.path] += '. ' + error.msg;
                } else {
                    errorObj[error.path] = error.msg;
                }
            });
            return thunkAPI.rejectWithValue({ validators: errorObj });
        }
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
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
