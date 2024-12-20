import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '~/features/search/searchSlice.js';
import favouriteReducer from '~/features/favorites/favoriteSlice.js';
import userReducer from '~/features/user/userSlice.js';
import socketReducer from '~/features/socket/socketSlice.js';

const store = configureStore({
    reducer: {
        search: searchReducer,
        favourites: favouriteReducer,
        user: userReducer,
        socket: socketReducer,
    },
});

export default store;
