import { createSlice } from '@reduxjs/toolkit';

const authenticatedSlice = createSlice({
    name: 'authenticated',
    initialState: {
        value: true,
        user: null,
    },
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload; // Lưu thông tin người dùng khi đăng nhập
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null; // Xóa thông tin người dùng khi đăng xuất
        },
        setUser(state, action) {
            state.user = action.payload; // Cập nhật thông tin người dùng
        },
    },
});

export const { login, logout, setUser } = authenticatedSlice.actions;
export default authenticatedSlice.reducer;
