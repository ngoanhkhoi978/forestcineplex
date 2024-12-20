import { createSlice } from '@reduxjs/toolkit';
import { loginUser, verifyTokenUser } from '~/features/user/userThunk.js';
import { selectSubscriptionPlan } from '~/features/user/userSelectors.js';

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        setSubscriptionPlan: (state, action) => {
            state.user = {
                ...state.user,
                subscriptionPlan: action.payload,
            };
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(verifyTokenUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyTokenUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(verifyTokenUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
