import { createAsyncThunk } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';

export const connectSocket = createAsyncThunk(
    'socket/connectSocket', // Tên action
    async (url, { dispatch, getState }) => {
        return new Promise((resolve, reject) => {
            let socket = getState().socket.socket;

            console.log(socket);

            if (!socket) {
                socket = io(url, {
                    withCredentials: true,
                });
            }

            socket.on('connect', () => {
                resolve(socket);
            });

            socket.on('connect_error', (error) => {
                reject(error);
            });
        });
    },
);
