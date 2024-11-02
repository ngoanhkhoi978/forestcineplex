import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '~/features/search/searchSlice.js';
import authenticatedReducer from '~/features/authenticated/authenticatedSlice.js';

const store = configureStore({
    reducer: {
        search: searchReducer,
        authenticated: authenticatedReducer,
    },
});

export default store;
