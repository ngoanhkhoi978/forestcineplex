import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { fetchReviewMovie } from '~/services/ratingService.js';
import { getRatingMovie, rateMovie } from '~/services/meService.js';

function Rating({ movieId, reviews = {}, onRender }) {
    const [score, setScore] = useState(2);

    useEffect(() => {
        getRatingMovie(movieId).then((result) => setScore(result.score ?? 0));
    }, [reviews]);

    const handleRate = (number) => {
        const currentScore = score === number ? 0 : number;
        rateMovie(movieId, currentScore).then((value) => {
            setScore(value.score ?? 0);
            onRender((pre) => pre + 1);
        });
    };

    return (
        <div className="fontRoboto h-64 w-72 rounded-sm bg-[#111e16] p-4">
            <div className="">
                <div className={'mb-1 text-sm font-medium text-gray-300'}>
                    {/**/}
                    <p>
                        {reviews.ratingCount === 0
                            ? 'No ratings available for this movie yet.'
                            : `Average ${reviews.averageRating} out of 5 stars`}
                    </p>
                </div>
                <div className={'flex'}>
                    <Star
                        className={classNames('size-6', {
                            'text-yellow-500': score >= 1,
                        })}
                        onClick={() => handleRate(1)}
                    />
                    <Star
                        className={classNames('size-6', {
                            'text-yellow-500': score >= 2,
                        })}
                        onClick={() => handleRate(2)}
                    />
                    <Star
                        className={classNames('size-6', {
                            'text-yellow-500': score >= 3,
                        })}
                        onClick={() => handleRate(3)}
                    />
                    <Star
                        className={classNames('size-6', {
                            'text-yellow-500': score >= 4,
                        })}
                        onClick={() => handleRate(4)}
                    />
                    <Star
                        className={classNames('size-6', {
                            'text-yellow-500': score >= 5,
                        })}
                        onClick={() => handleRate(5)}
                    />
                </div>
                <div className={'mt-6 text-sm italic text-gray-300'}>
                    <p>{`${reviews.ratingCount} ratings`}</p>
                </div>
                <div className={'space-y-1'}>
                    <div className={'flex items-center space-x-2'}>
                        <StarSolid />
                        <span>5</span>
                        <progress value={reviews.fiveStars / reviews.ratingCount} className={'h-2'} />
                        <span>
                            {reviews.ratingCount === 0
                                ? 'Unrated'
                                : `${((reviews.fiveStars / reviews.ratingCount) * 100).toFixed(1)}%`}
                        </span>
                    </div>
                    <div className={'flex items-center space-x-2'}>
                        <StarSolid />
                        <span>4</span>
                        <progress value={reviews.fourStars / reviews.ratingCount} className={'h-2'} />
                        <span>
                            {reviews.ratingCount === 0
                                ? 'Unrated'
                                : `${((reviews.fourStars / reviews.ratingCount) * 100).toFixed(1)}%`}
                        </span>
                    </div>
                    <div className={'flex items-center space-x-2'}>
                        <StarSolid />
                        <span>3</span>
                        <progress value={reviews.threeStars / reviews.ratingCount} className={'h-2'} />
                        <span>
                            {reviews.ratingCount === 0
                                ? 'Unrated'
                                : `${((reviews.threeStars / reviews.ratingCount) * 100).toFixed(1)}%`}
                        </span>
                    </div>
                    <div className={'flex items-center space-x-2'}>
                        <StarSolid />
                        <span>2</span>
                        <progress value={reviews.twoStars / reviews.ratingCount} className={'h-2'} />
                        <span>
                            {reviews.ratingCount === 0
                                ? 'Unrated'
                                : `${((reviews.twoStars / reviews.ratingCount) * 100).toFixed(1)}%`}
                        </span>
                    </div>
                    <div className={'flex items-center space-x-2'}>
                        <StarSolid />
                        <span>1</span>
                        <progress value={reviews.oneStar / reviews.ratingCount} className={'h-2'} />
                        <span>
                            {reviews.ratingCount === 0
                                ? 'Unrated'
                                : `${((reviews.oneStar / reviews.ratingCount) * 100).toFixed(1)}%`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Star = ({ className, onClick }) => (
    <svg
        className={classNames('size-4 text-gray-500', className)}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
        onClick={onClick}
    >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
);

Star.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    score: PropTypes.number,
};

const StarSolid = ({ className }) => (
    <svg
        className={classNames('size-4 text-yellow-300', className)}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
    >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
);

StarSolid.propTypes = {
    className: PropTypes.string,
};

const StarRegular = ({ className }) => (
    <svg
        className={classNames('size-4 text-gray-500', className)}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
    >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
);

StarRegular.propTypes = {
    className: PropTypes.string,
};

Rating.propTypes = {
    reviews: PropTypes.object,
    movieId: PropTypes.string,
    onRender: PropTypes.func,
};

export default Rating;
