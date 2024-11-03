import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '~/features/search/searchSlice.js';
import authenticationReducer from '~/features/authentication/authenticationSlice.js';

const store = configureStore({
    reducer: {
        search: searchReducer,
        authentication: authenticationReducer,
    },
});

export default store;
