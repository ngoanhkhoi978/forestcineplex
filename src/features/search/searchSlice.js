import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        value: '',
    },
    reducers: {
        searchChange: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { searchChange } = searchSlice.actions;
export default searchSlice.reducer;
