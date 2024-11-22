import { useRef, useEffect } from 'react';
import Hls from 'hls.js';
import PropTypes from 'prop-types';

const VideoPlayer = ({ videoRef , src, ...props }) => {

    useEffect(() => {
        const video = videoRef.current;

        if (Hls.isSupported()) {
            const hls = new Hls({
                xhrSetup: (xhr) => {
                    xhr.withCredentials = true;
                },
            });

            hls.loadSource(src);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
            });

            return () => {
                hls.destroy();
            };
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
            video.addEventListener('loadedmetadata', () => {
                video.play();
            });
        }
    }, [src]);

    return <video ref={videoRef} {...props} />;
};

VideoPlayer.propTypes = {
    src: PropTypes.string,
    className: PropTypes.string,
    videoRef: PropTypes.string
};

export default VideoPlayer;
