import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        receiveNotification: (state, action) => {
            state.push(action.payload);
        },
    },

    extraReducers: (builder) => {},
});
