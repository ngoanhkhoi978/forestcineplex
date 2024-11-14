import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import PropTypes from 'prop-types';
import classNames from 'classnames'; // Để xử lý className

const VideoPlayer = ({ videoSrc, className }) => {
    const videoRef = useRef(null); // ref để lưu video element
    const [error, setError] = useState(false);
    const [playerReady, setPlayerReady] = useState(false);

    useEffect(() => {
        if (videoRef.current && videoSrc) {
            const newPlayer = videojs(videoRef.current, {
                autoplay: true,
                controls: true,
                sources: [
                    {
                        src: videoSrc,
                        type: 'application/x-mpegURL', // HLS stream type
                    },
                ],
            });

            newPlayer.on('error', () => {
                const errorMessage = newPlayer.error()?.message || 'An error occurred while playing the video.';
                setError(true); // Cập nhật state lỗi
            });

            return () => {
                if (newPlayer && newPlayer.el() && newPlayer.el().parentNode) {
                    newPlayer.dispose(); // Giải phóng tài nguyên player nếu element còn tồn tại
                }
            };
        }
    }, [videoSrc]); // Khi videoSrc thay đổi

    if (error && playerReady) return <div>Lỗi rồi</div>;

    if (!videoSrc) {
        console.log('deo co');
        return <div>Loading...</div>;
    }

    return (
        <div className={classNames('video-container', className)}>
            <video ref={videoRef} className="video-js vjs-default-skin" style={{ width: '100%' }} />
        </div>
    );
};

VideoPlayer.propTypes = {
    videoSrc: PropTypes.string,
    className: PropTypes.string,
};

export default VideoPlayer;
