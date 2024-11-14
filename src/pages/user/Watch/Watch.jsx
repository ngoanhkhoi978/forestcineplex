import 'video.js/dist/video-js.css';
import VideoPlayer from '~/components/VideoPlayer/VideoPlayer.jsx';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import config from '~/config/index.js';
import VideoJS from '~/components/VideoPlayer/VideoJS.jsx';
import videojs from 'video.js';

function Watch() {
    const { mediaId } = useParams();
    const playerRef = useRef(null);
    const navigate = useNavigate();

    const videoOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        preload: 'auto',
        playbackRates: [0.25, 0.5, 1, 1.25, 1.5, 1.75, 2],
        sources: [
            {
                src: `${config.baseURL}/movies/media/${mediaId}/${mediaId}.m3u8`,
                type: 'application/x-mpegURL',
                withCredentials: true,
            },
        ],
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.on('waiting', () => {
            videojs.log('player is waiting');
        });

        player.on('dispose', () => {
            videojs.log('player will dispose');
        });
    };

    const handlePlayerError = (player) => {
        if (player && !player.isDisposed()) {
            player.dispose();
            playerRef.current = null;
        }
        navigate('/not-found-movie');
    };

    return (
        <div className="container mx-auto pt-header">
            <VideoJS options={videoOptions} onReady={handlePlayerReady} onError={handlePlayerError} />
        </div>
    );
}

export default Watch;
