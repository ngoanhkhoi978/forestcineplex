import images from '~/assets/images/index.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useClickStatus from '~/hooks/useClickStatus.js';
import { useEffect, useRef, useState } from 'react';
import useScroll from '~/hooks/useScroll.js';
import VideoPlayer from '~/components/VideoPlayer/VideoPlayer.jsx';
import { fetchRandomMovie } from '~/services/movieService.js';
import { getFullResourceUrl } from '~/libs/utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

function Billboard({ className }) {
    const isClicked = useClickStatus();
    const videoRef = useRef(null);
    const isScroll = useScroll(300);

    const [activeMovie, setActiveMovie] = useState({});

    useEffect(() => {
        fetchRandomMovie()
            .then((movie) => setActiveMovie(movie))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        videoRef.current.play();
    }, [isClicked]);

    useEffect(() => {
        if (isScroll) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
    }, [isScroll]);

    return (
        <div className={classNames('relative z-10', className)}>
            {/*<video ref={videoRef} className="h-screen w-full object-cover object-bottom" loop={true} autoPlay={true}>*/}
            {/*    <source src="http://localhost:3000/api/movies/trailer" type="video/mp4" />*/}
            {/*</video>*/}
            <VideoPlayer
                videoRef={videoRef}
                className="h-auto w-full object-cover object-bottom"
                src={getFullResourceUrl(activeMovie.trailerUrl)}
                volume="0.0"
                autoplay={true}
            />

            <div className="container absolute bottom-1/2 left-0 right-0 mx-auto">
                <h1 className="font-[Itim] text-5xl uppercase text-white md:text-8xl">{activeMovie.title}</h1>
                <div className="mt-10">
                    <button
                        type="button"
                        className="flex rounded-lg bg-green-500 px-10 py-4 text-2xl font-bold text-white hover:bg-green-600"
                    >
                        <FontAwesomeIcon className="mr-2 text-3xl" icon={faPlay} />
                        <span>Play</span>
                    </button>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/6 bg-gradient-to-t from-[#0a140c]/100 to-transparent"></div>
        </div>
    );
}

Billboard.propTypes = {
    className: PropTypes.string,
};
export default Billboard;
