import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { connectSocket } from '~/features/socket/socketThunk.js';

const initialState = {
    socket: null,
    connected: false,
    notifications: [],
    messages: [],
    hasSetRole: false,
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setRole: (state) => {
            if (state.socket && state.connected) {
                state.socket.emit('setRole', '');
                state.hasSetRole = true;
            }
        },

        disconnectSocket: (state) => {
            if (state.socket) {
                state.socket.disconnect();
                state.socket = null;
                state.connected = false;
            }
        },
        sendMessage: (state, action) => {
            if (state.socket && state.connected) {
                const { type, message } = action.payload;
                state.socket.emit(type, message);
            }
        },
        receiveNotification: (state, action) => {
            state.notifications.push(action.payload);
        },
        receiveAdminMessage: (state, action) => {
            state.messages.push(action.payload);
        },
    },

    extraReducers: (builder) => {
        builder.addCase(connectSocket.fulfilled, (state, action) => {
            state.connected = true;
            state.socket = action.payload;
        });
    },
});

export const { disconnectSocket, sendMessage, receiveNotification } = socketSlice.actions;
export default socketSlice.reducer;
