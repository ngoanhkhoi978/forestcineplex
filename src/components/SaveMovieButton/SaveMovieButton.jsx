import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faRegularBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteMovie, deleteFavoriteMovie } from '~/features/favorites/favoriteSlice.js';
import { selectUserId } from '~/features/user/userSelectors.js';

import {
    addFavouriteMovie as addFavouriteMovieAPI,
    deleteFavouriteMovie as removeFavoriteMovieAPI,
} from '~/services/meService.js';
import { useToast } from '~/providers/ToastProvider.jsx';

function SaveMovieButton({ className = 'text-xl lg:text-2xl 2xl:text-3xl leading-none', movie }) {
    const [isSave, setIsSave] = useState(false);
    const userId = useSelector(selectUserId);
    const { favoriteMovies } = useSelector((state) => state.favourites);
    const dispatch = useDispatch();
    const { showToast } = useToast();

    useEffect(() => {
        if (favoriteMovies) {
            setIsSave(favoriteMovies.some((favourite) => favourite.movieId._id === movie._id));
        }
    }, [movie]);

    const handleOnClick = () => {
        const currentSave = !isSave;
        if (currentSave) {
            addFavouriteMovieAPI(movie._id).then((favourite) => {
                console.log(favourite);
                dispatch(addFavoriteMovie(favourite));
                showToast('Movie saved successfully.', 'success', 3000);
            });
            setIsSave(true);
        } else {
            removeFavoriteMovieAPI(movie._id).then((favourite) => {
                dispatch(deleteFavoriteMovie(movie._id));
                setIsSave(false);
                showToast('Movie save successfully cancelled.', 'warning', 3000);
            });
        }
    };

    return (
        <div className={classNames(className)} onClick={handleOnClick}>
            {isSave ? (
                <FontAwesomeIcon className={''} icon={faBookmark} />
            ) : (
                <div className={classNames(className, 'group/bookmark')}>
                    <FontAwesomeIcon className={'block group-hover/bookmark:hidden'} icon={faRegularBookmark} />
                    <FontAwesomeIcon className={'hidden group-hover/bookmark:block'} icon={faBookmark} />
                </div>
            )}
        </div>
    );
}

SaveMovieButton.propTypes = {
    className: PropTypes.string,
    movie: PropTypes.object.isRequired,
};

export default SaveMovieButton;
