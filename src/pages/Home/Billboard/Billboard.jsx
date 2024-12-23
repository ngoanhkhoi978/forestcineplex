import images from '~/assets/images/index.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useClickStatus from '~/hooks/useClickStatus.js';
import { useEffect, useRef, useState } from 'react';
import useScroll from '~/hooks/useScroll.js';
import VideoPlayer from '~/components/VideoPlayer/VideoPlayer.jsx';
import { fetchRandomMovie, getFullMediaUrl } from '~/services/movieService.js';
import { getFullResourceUrl } from '~/utils/utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import VideoJS from '~/components/VideoPlayer/VideoJS.jsx';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import config from '~/config/index.js';

function Billboard({ className }) {
    const isClicked = useClickStatus();
    const videoRef = useRef(null);

    const [activeMovie, setActiveMovie] = useState({});

    useEffect(() => {
        fetchRandomMovie(1)
            .then((movies) => setActiveMovie(movies[0]))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className={classNames('relative z-10', className)}>
            <VideoJS
                options={{
                    autoplay: true,
                    controls: false,
                    fluid: true,
                    responsive: true,
                    sources: [
                        {
                            src: getFullResourceUrl(activeMovie.trailerUrl),
                            withCredentials: true,
                        },
                    ],
                }}
            />

            <div className="container absolute bottom-1/4 left-0 right-0 mx-auto select-none md:bottom-1/2 md:translate-y-1/2">
                <h1 className="font-[Itim] text-3xl uppercase text-white md:text-6xl">{activeMovie.title}</h1>
                <div className="mt-4 flex space-x-4 md:mt-10">
                    <Link
                        to={`/watch/${activeMovie?.episodes?.length > 0 ? activeMovie?.episodes[0]?.mediaId : ''}`}
                        type="button"
                        className={classNames(
                            'flex h-9 w-24 items-center justify-center rounded-sm bg-white text-sm font-bold leading-none text-black md:h-10 md:w-28 md:rounded-lg lg:h-12 lg:w-32',
                            {
                                'pointer-events-none opacity-75 brightness-75': activeMovie?.episodes?.length === 0,
                            },
                        )}
                    >
                        <FontAwesomeIcon className="mr-2" icon={faPlay} />
                        <span>{activeMovie?.episodes?.length === 0 ? 'Coming soon' : 'Play'}</span>
                    </Link>

                    <button
                        type="button"
                        className="flex h-9 w-28 items-center justify-center rounded-sm bg-gray-500 text-sm font-bold leading-none text-white md:h-10 md:w-32 md:rounded-lg lg:h-12 lg:w-36"
                    >
                        <FontAwesomeIcon className="mr-2 text-xl" icon={faCircleQuestion} />
                        <span>More info</span>
                    </button>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#070c09]/100 to-transparent"></div>
        </div>
    );
}

Billboard.propTypes = {
    className: PropTypes.string,
};
export default Billboard;
