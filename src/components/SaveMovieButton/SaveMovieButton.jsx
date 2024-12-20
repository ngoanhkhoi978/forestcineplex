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
    removeFavouriteMovie as removeFavoriteMovieAPI,
} from '~/services/favouriteService.js';

function SaveMovieButton({ className = 'text-xl lg:text-2xl 2xl:text-3xl leading-none', movie }) {
    const [isSave, setIsSave] = useState(false);
    const userId = useSelector(selectUserId);
    const { favoriteMovies } = useSelector((state) => state.favourites);
    const dispatch = useDispatch();

    useEffect(() => {
        if (favoriteMovies) {
            setIsSave(favoriteMovies.some((favourite) => favourite.movieId._id === movie._id));
        }
    }, [movie]);

    useEffect(() => {
        const isCurrentSave = favoriteMovies?.some((favourite) => favourite.movieId._id === movie._id);
        if (isSave && !isCurrentSave) {
            dispatch(
                addFavoriteMovie({
                    movieId: movie,
                    userId: userId,
                }),
            );
            addFavouriteMovieAPI(userId, movie._id).then();
        } else if (!isSave && isCurrentSave) {
            dispatch(deleteFavoriteMovie(movie._id));
            removeFavoriteMovieAPI(userId, movie._id).then();
        }
    }, [isSave]);

    return (
        <div className={classNames(className)} onClick={() => setIsSave(!isSave)}>
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
