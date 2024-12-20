import { ExpandableCardDemo } from '~/components/ui-aceternity/ExpandableCard/ExpandableCard.jsx';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { fetchMoviesWithGenre } from '~/services/movieService.js';
import { MovieCard } from '~/components/ui-aceternity/MovieCard/MovieCard.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function MovieCategory({ genre, isSeries = null }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMoviesWithGenre(genre, 6, 1, isSeries).then((movies) => setMovies(movies));
    }, [genre]);

    if (movies.length < 1) return null;

    return (
        <>
            <div className="2xl:mt-10npm container mx-auto mt-4 md:mt-6 lg:mt-8">
                <div>
                    <Link to={`/search?genre=${genre}`} className="group mb-4 flex max-w-max items-center">
                        <h1 className="text-2xl font-bold text-white md:text-3xl lg:text-3xl 2xl:text-4xl">{genre}</h1>
                        <div className="ml-2 flex items-center text-[#1e7bb4]">
                            <h3 className="max-w-full overflow-hidden text-nowrap text-sm font-medium opacity-100 transition-all duration-500 ease-in-out group-hover:max-w-full group-hover:opacity-100 lg:max-w-0 lg:opacity-0">
                                Explore more
                            </h3>
                            <FontAwesomeIcon
                                className="text-md md:text-lg lg:text-xl 2xl:text-2xl"
                                icon={faAngleRight}
                            />
                        </div>
                    </Link>

                    <div className="grid grid-cols-12 gap-2 xl:gap-4">
                        {movies &&
                            movies.map((movie) => (
                                <MovieCard
                                    className={'col-span-6 md:col-span-4 xl:col-span-2'}
                                    key={movie._id}
                                    movie={movie}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </>
    );
}

MovieCategory.propTypes = {
    genre: PropTypes.string,
};

export default MovieCategory;
