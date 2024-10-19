import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { searchChange } from '~/features/search/searchSlice.js';

function Search() {
    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.search.value);

    useEffect(() => {
        return () => {
            dispatch(searchChange(''));
        };
    }, []);

    return (
        <div className="pt-header container mx-auto">
            <h1>Đây là giá trị: {searchValue}</h1>
        </div>
    );
}

export default Search;
