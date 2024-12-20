import { SearchOutlined } from '@ant-design/icons';
import { useRef, useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import useDebounce from '~/hooks/useDebounce.js';
import { useDispatch, useSelector } from 'react-redux';
import { searchChange } from '~/features/search/searchSlice.js';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import config from '~/config/index.js';
import { searchMovies } from '~/services/movieService.js';

function Search() {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef();
    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.search.value);

    const navigative = useNavigate();
    const [t] = useTranslation();

    useEffect(() => {
        if (searchValue === '') {
            navigative(config.routes.home);
        } else {
            navigative(`${config.routes.search}?title=${encodeURIComponent(searchValue)}`);
        }
    }, [searchValue]);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    const handleInputChange = useCallback((e) => {
        dispatch(searchChange(e.target.value));
    }, []);

    const handleButtonClick = useCallback(() => {
        inputRef.current.focus();
        setIsFocused(true);
    }, []);

    const containerClass = classNames(
        'flex min-w-14 rounded-full bg-gray-800 px-4 py-2 text-white placeholder-gray-400 opacity-90 transition-all duration-500 ease-in-out',
        {
            'w-64 border outline-none ring-2 ring-green-500': isFocused,
            'w-0 border-none bg-transparent': !isFocused,
        },
    );

    return (
        <div
            className={classNames(
                'flex min-w-14 rounded-xl border-none px-4 py-2 text-white placeholder-gray-400 opacity-90 transition-all duration-500 ease-in-out',
                {
                    'w-64 bg-black-75 ring-1 ring-green-100': isFocused,
                    'w-0 bg-transparent': !isFocused,
                },
            )}
        >
            <button
                className={classNames({
                    'pointer-events-none': isFocused,
                    'px-3': !isFocused,
                })}
                onClick={handleButtonClick}
            >
                <SearchOutlined className="text-2xl text-white active:scale-125" />
            </button>
            <input
                className="w-0 grow border-0 bg-transparent ps-2 outline-none"
                type="text"
                placeholder={isFocused ? t('search') : ''}
                ref={inputRef}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                value={searchValue}
            />
        </div>
    );
}

export default Search;
