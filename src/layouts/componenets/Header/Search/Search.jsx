import { SearchOutlined } from '@ant-design/icons';
import { useRef, useState, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import useDebounce from '~/hooks/useDebounce.js';

function Search() {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef();
    const debounced = useDebounce(inputValue, 500);

    useEffect(() => {
        console.log(debounced);
    }, [debounced]);

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);
    }, []);

    const handleInputChange = useCallback((e) => {
        setInputValue(e.target.value);
    }, []);

    const handleButtonClick = useCallback(() => {
        console.log('button');
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
                    'bg-black-75 w-64 ring-1 ring-green-100': isFocused,
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
                placeholder={isFocused ? 'Tìm kiếm' : ''}
                ref={inputRef}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
                value={inputValue}
            />
        </div>
    );
}

export default Search;
