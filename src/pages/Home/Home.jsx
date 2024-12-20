import Billboard from '~/pages/Home/Billboard/Billboard.jsx';
import { ExpandableCardDemo } from '~/components/ui-aceternity/ExpandableCard/ExpandableCard.jsx';

import Carousel from '~/components/CarouselCard/Carousel.jsx';
import MovieCategory from '~/components/MovieCategory/MovieCategory.jsx';
import { useEffect, useState } from 'react';
import { fetchGenres } from '~/services/genresService.js';
import { fetchRandomMovie } from '~/services/movieService.js';
import { MovieCard } from '~/components/ui-aceternity/MovieCard/MovieCard.jsx';
import { BackgroundBeams } from '~/components/ui-aceternity/BackgroundBeams/BackgroundBeams.jsx';

function Home() {
    const [genres, setGenres] = useState([]);
    const [populateMovies, setPopulateMovies] = useState([]);

    useEffect(() => {
        fetchGenres().then((genres) => setGenres(genres));
        fetchRandomMovie(6).then((movies) => setPopulateMovies(movies));
    }, []);

    return (
        <div className={'relative'}>
            <div className="relative z-20 w-full">
                <Billboard className="h-full w-full" />
                <div className="container bottom-0 left-0 right-0 z-20 mx-auto block xl:absolute">
                    <h1 className="mb-4 text-4xl font-bold text-white">Hot today</h1>

                    <div className="grid grid-cols-12 gap-4 xl:mb-10 2xl:mb-20">
                        {populateMovies.map((movie) => (
                            <MovieCard
                                key={movie._id}
                                movie={movie}
                                className="col-span-6 md:col-span-4 xl:col-span-2"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {genres.map((genre) => (
                <MovieCategory key={genre._id} genre={genre.name} />
            ))}
        </div>
    );
}

export default Home;
