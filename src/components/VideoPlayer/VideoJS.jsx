import 'videojs-max-quality-selector/dist/videojs-max-quality-selector.css';

import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import PropTypes from 'prop-types';
import { useRef, useEffect, memo } from 'react';
import 'videojs-max-quality-selector';
import useScroll from '~/hooks/useScroll.js';
import { selectSubscriptionPlan } from '~/features/user/userSelectors.js';
import { useSelector } from 'react-redux';

const maxResolutions = {
    Basic: 480,
    Standard: 720,
    Premium: 1080,
};

export const VideoJS = ({ options, onReady, className }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    const isScroll = useScroll(300);
    const subscriptionPlan = useSelector(selectSubscriptionPlan);

    useEffect(() => {
        if (playerRef.current && options.autoplay) {
            if (isScroll) {
                playerRef.current.pause();
            } else {
                playerRef.current.play();
            }
        }
    }, [isScroll]);

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement('video-js');
            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current.appendChild(videoElement);

            const player = (playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                onReady && onReady(player);

                const html5Video = player.el().querySelector('video');
                if (html5Video && className) {
                    html5Video.classList.add(...className.split(' '));
                }
            }));

            player.maxQualitySelector({
                defaultQuality: 2,
                displayMode: 1,
                maxHeight: maxResolutions[subscriptionPlan] ?? 480,
            });

            player.src(options.sources);
        } else {
            const player = playerRef.current;
            player.src(options.sources);
        }
    }, [options, videoRef]);

    useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    );
};

VideoJS.propTypes = {
    options: PropTypes.object,
    onReady: PropTypes.func,
    className: PropTypes.string,
};

export default memo(VideoJS);
