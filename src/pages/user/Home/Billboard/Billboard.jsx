import images from '~/assets/images/index.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useClickStatus from '~/hooks/useClickStatus.js';
import { useEffect, useRef } from 'react';
import useScroll from '~/hooks/useScroll.js';

function Billboard({ className }) {
    const isClicked = useClickStatus();
    const videoRef = useRef(null);
    const isScroll = useScroll(300);

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
            <video ref={videoRef} className="h-screen w-full object-cover object-bottom" loop={true} autoPlay={true}>
                <source src="http://192.168.2.103:3000/api/movies/trailer" type="video/mp4" />
            </video>
            <div className="container pointer-events-none absolute bottom-0 left-0 right-0 top-0 mx-auto">
                <img className="absolute left-0 top-0 w-1/2" src={images.titleMovie} alt="" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/6 bg-gradient-to-t from-[#162b1b]/100 to-transparent"></div>
        </div>
    );
}

Billboard.propTypes = {
    className: PropTypes.string,
};
export default Billboard;
