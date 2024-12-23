import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { MovieCard } from '~/components/MovieCard/MovieCard.jsx';
import { getUserFavouriteMovies } from '~/features/favorites/favouriteThunk.js';

function MyList() {
    const dispatch = useDispatch();

    const { favoriteMovies } = useSelector((state) => state.favourites);

    if (favoriteMovies && !favoriteMovies.length) {
        return (
            <div className="container mx-auto h-screen pt-header">
                <h1 className="text-3xl font-bold text-green-700">Empty</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto h-screen pt-header">
            <h1 className="mb-10 text-3xl font-bold text-white">My List</h1>
            <div className="grid grid-cols-12 gap-4">
                {favoriteMovies &&
                    favoriteMovies.map((favourite) => (
                        <MovieCard
                            className="col-span-6 md:col-span-4 xl:col-span-2"
                            key={favourite._id}
                            movie={favourite.movieId}
                        />
                    ))}
            </div>
        </div>
    );
}

export default MyList;
