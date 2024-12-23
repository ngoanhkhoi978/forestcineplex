import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useLayoutEffect, useCallback, useRef } from 'react';
import { searchChange } from '~/features/search/searchSlice.js';
import useDebounce from '~/hooks/useDebounce.js';
import { searchMovies } from '~/services/movieService.js';
import { useSearchParams } from 'react-router-dom';
import { MovieCard } from '~/components/MovieCard/MovieCard.jsx';

function Search() {
    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.search.value);
    const debounced = useDebounce(searchValue, 500);
    const [searchParams] = useSearchParams();
    const [resultList, setResultList] = useState([]);

    useEffect(() => {
        if (searchParams.get('title')) {
            searchMovies({ title: searchParams.get('title') })
                .then((list) => setResultList(list))
                .catch(() => setResultList([]));
        }
    }, [debounced]);

    useEffect(() => {
        if (searchParams.get('genre')) {
            searchMovies({ genre: searchParams.get('genre') })
                .then((list) => setResultList(list))
                .catch(() => setResultList([]));
        }

        if (searchParams.get('cast')) {
            searchMovies({ cast: searchParams.get('cast') })
                .then((list) => setResultList(list))
                .catch(() => setResultList([]));
        }
    }, [searchParams]);

    useEffect(() => {
        return () => {
            dispatch(searchChange(''));
        };
    }, []);

    return (
        <div className="container mx-auto pt-header">
            <h1 className={'mb-10 text-3xl font-bold text-white first-letter:uppercase'}>{searchValue}</h1>
            <div className="grid grid-cols-12 gap-4">
                {resultList &&
                    resultList.map((movie) => (
                        <MovieCard className="col-span-6 md:col-span-4 lg:col-span-2" key={movie._id} movie={movie} />
                    ))}
            </div>
        </div>
    );
}

export default Search;
