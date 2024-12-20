import { useEffect, useState } from 'react';
import { fetchGenres } from '~/services/genresService.js';
import MovieCategory from '~/components/MovieCategory/MovieCategory.jsx';

function Movies() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetchGenres().then((genres) => setGenres(genres));
    }, []);
    return (
        <div className="container mx-auto pt-header">
            <h1 className="text-3xl font-bold text-white">Movies</h1>
            <div>
                {genres.map((genre) => (
                    <MovieCategory key={genre._id} genre={genre.name} isSeries={false} />
                ))}
            </div>
        </div>
    );
}

export default Movies;
