import { createSlice } from '@reduxjs/toolkit';

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: {
        isAuthenticated: false,
        user: null,
        token: null,
    },
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.token = action.payload;
        },
        logout(state) {
            state.value = false;
            state.user = null;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});

export const { login, logout, setUser } = authenticationSlice.actions;
export default authenticationSlice.reducer;
