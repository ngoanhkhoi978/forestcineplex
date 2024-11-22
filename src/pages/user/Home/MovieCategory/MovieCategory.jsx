import { ExpandableCardDemo } from '~/components/ui-aceternity/ExpandableCard/ExpandableCard.jsx';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { fetchMoviesWithGenre } from '~/services/movieService.js';
import { MovieCard } from '~/components/ui-aceternity/MovieCard/MovieCard.jsx';

function MovieCategory({ genre }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMoviesWithGenre(genre).then((movies) => setMovies(movies));
    }, [genre]);

    if (movies.length < 1) return null;

    return (
        <>
            <div className="container mx-auto mt-20">
                <div>
                    <h1 className="mb-4 text-4xl font-bold text-white">{genre}</h1>
                    <div className="grid grid-cols-12 gap-4">
                        {movies &&
                            movies.map((movie) => (
                                <MovieCard
                                    className={'col-span-6 md:col-span-4 lg:col-span-2'}
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
