import Billboard from '~/pages/user/Home/Billboard/Billboard.jsx';
import { ExpandableCardDemo } from '~/components/ui-aceternity/ExpandableCard/ExpandableCard.jsx';

import Carousel from '~/components/CarouselCard/Carousel.jsx';
import MovieCategory from '~/pages/user/Home/MovieCategory/MovieCategory.jsx';
import { useEffect, useState } from 'react';
import { fetchGenres } from '~/services/genresService.js';

function Home() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetchGenres().then((genres) => setGenres(genres));
    }, []);

    return (
        <div>
            <div className="relative w-full">
                <Billboard className="h-full w-full" />
                <div className="container bottom-0 left-0 right-0 z-20 mx-auto block lg:absolute">
                    <h1 className="mb-4 text-4xl font-bold text-white">Hot today</h1>

                    <div className="grid grid-cols-12 gap-4">
                        <ExpandableCardDemo className="col-span-6 md:col-span-4 lg:col-span-2" />
                        <ExpandableCardDemo className="col-span-6 md:col-span-4 lg:col-span-2" />
                        <ExpandableCardDemo className="col-span-6 md:col-span-4 lg:col-span-2" />
                        <ExpandableCardDemo className="col-span-6 md:col-span-4 lg:col-span-2" />
                        <ExpandableCardDemo className="col-span-6 md:col-span-4 lg:col-span-2" />
                        <ExpandableCardDemo className="col-span-6 md:col-span-4 lg:col-span-2" />
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
