import { useEffect, useState } from 'react';
import { fetchMoviesWithGenre } from '~/services/movieService.js';
import { fetchGenres } from '~/services/genresService.js';
import MovieCategory from '~/components/MovieCategory/MovieCategory.jsx';
import { BackgroundBeams } from '~/components/ui-aceternity/BackgroundBeams/BackgroundBeams.jsx';

function TVShows() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetchGenres().then((genres) => setGenres(genres));
    }, []);

    return (
        <div className="container mx-auto pt-header">
            <BackgroundBeams />
            <div className={'relative z-10'}>
                <h1 className="mb-10 text-3xl font-bold text-white">TV Shows</h1>
                <div>
                    {genres.map((genre) => (
                        <MovieCategory key={genre._id} genre={genre.name} isSeries={true} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TVShows;
