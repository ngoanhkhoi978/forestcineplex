import Billboard from '~/pages/user/Home/Billboard/Billboard.jsx';
import { ExpandableCardDemo } from '~/components/ui-aceternity/ExpandableCard/ExpandableCard.jsx';

import Carousel from '~/components/CarouselCard/Carousel.jsx';

function Home() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

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
            <div className="container mx-auto mt-32">
                <div>
                    <h1 className="mb-4 text-4xl font-bold text-white">Movies</h1>
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
        </div>
    );
}

export default Home;
