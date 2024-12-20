import { createSlice } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import { connectSocket } from '~/features/socket/socketThunk.js';

const initialState = {
    socket: null,
    connected: false,
};

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        disconnectSocket: (state) => {
            if (state.socket) {
                state.socket.disconnect();
                state.socket = null;
                state.connected = false;
            }
        },
        sendMessage: (state, action) => {
            console.log(state.socket, state.connected);
            if (state.socket && state.connected) {
                const { type, message } = action.payload;
                state.socket.emit(type, message);
            }
        },
        setSocket: (state, action) => {
            state.socket = action.payload.socket;
            state.connected = action.payload.connected;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(connectSocket.fulfilled, (state, action) => {
            state.connected = true;
            state.socket = action.payload;
        });
    },
});

export const { disconnectSocket, sendMessage } = socketSlice.actions;
export default socketSlice.reducer;
