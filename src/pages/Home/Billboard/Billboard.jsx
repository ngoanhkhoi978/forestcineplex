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

            <div className="container absolute bottom-1/2 left-0 right-0 mx-auto">
                <h1 className="font-[Itim] text-5xl uppercase text-white md:text-8xl">{activeMovie.title}</h1>
                <div className="mt-10">
                    <button
                        type="button"
                        className="flex rounded-lg bg-green-800 px-10 py-4 text-2xl font-bold text-white opacity-75 hover:bg-green-900"
                    >
                        <FontAwesomeIcon className="mr-2 text-3xl" icon={faPlay} />
                        <span>Play</span>
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
