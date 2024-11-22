import 'video.js/dist/video-js.css';
import VideoPlayer from '~/components/VideoPlayer/VideoPlayer.jsx';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import config from '~/config/index.js';
import VideoJS from '~/components/VideoPlayer/VideoJS.jsx';
import videojs from 'video.js';
import { getFullMediaUrl } from '~/services/movieService.js';

function Watch() {
    const { mediaId } = useParams();
    const videoRef = useRef(null);

    console.log(getFullMediaUrl(mediaId));

    return (
        <div className="container mx-auto pt-header">
            <VideoPlayer controls videoRef={videoRef} src={getFullMediaUrl(mediaId)} className={'h-auto w-full'} />
        </div>
    );
}

export default Watch;
