import 'video.js/dist/video-js.css';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getFullMediaUrl } from '~/services/movieService.js';
import VideoJS from '~/components/VideoPlayer/VideoJS.jsx';
import { fetchEpisodeByMediaId } from '~/services/episodeService.js';
import classNames from 'classnames';
import { episodeSort, getFullResourceUrl } from '~/utils/utils.js';
import PropTypes from 'prop-types';
import { faCaretDown, faMultiply, faPlay, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, AnimatePresence } from 'framer-motion';
import { CardSpotlight } from '~/components/ui-aceternity/CardSpotlight/CardSpotlight.jsx';
import BackgroundLines from '~/components/ui-aceternity/BackgroundLines/BackgroundLines.jsx';
import SaveMovieButton from '~/components/SaveMovieButton/SaveMovieButton.jsx';
import Comment from '~/pages/Watch/Comment/Comment.jsx';
import { incrementViews } from '~/services/viewService.js';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import Menu from '~/layouts/DefaultLayout/Header/AvatarMenu/Menu/Menu.jsx';
import Rating from '~/pages/Watch/Rating.jsx';
import { fetchReviewMovie } from '~/services/ratingService.js';

function Watch() {
    const { mediaId } = useParams();

    const [activeEpisode, setActiveEpisode] = useState({});
    const [movie, setMovie] = useState({});
    const [reviews, setReviews] = useState({});
    const [render, onRender] = useState(0);

    useEffect(() => {
        if (mediaId) {
            fetchEpisodeByMediaId(mediaId).then((episode) => {
                setMovie(episode.movie);
                setActiveEpisode(episode);
                incrementViews(episode.movie._id);
            });
        }
    }, [mediaId]);

    useEffect(() => {
        if (movie) {
            fetchReviewMovie(movie._id).then((result) => setReviews(result ?? 0));
        }
    }, [movie, render]);

    return (
        <div className="mx-auto">
            <VideoJS
                options={{
                    autoplay: false,
                    controls: true,
                    fluid: true,
                    responsive: true,
                    sources: [
                        {
                            src: getFullMediaUrl(mediaId),
                            type: 'application/x-mpegURL',
                            withCredentials: true,
                        },
                    ],
                }}
            />
            <div className={'container mx-auto mt-12 px-2 text-white md:px-0'}>
                <div className="grid grid-cols-12 gap-4">
                    <div className={'relative order-2 col-span-12 md:order-1 md:col-span-7 2xl:col-span-9'}>
                        <BackgroundLines className={'rounded-lg bg-black/25 p-4 xl:p-32'}>
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <h1 className="font-notoSans text-lg font-medium leading-none text-green-500 lg:text-xl 2xl:text-2xl">{`${movie.title}`}</h1>
                                    <span className={'mx-2 leading-none text-gray-500'}>|</span>
                                    <Tippy
                                        render={(attrs) => (
                                            <Rating reviews={reviews} movieId={movie._id} onRender={onRender} />
                                        )}
                                        placement="bottom-start"
                                        delay={[0, 100]}
                                        interactive
                                        offset={[0, 10]}
                                        arrow={true}
                                        trigger={'click'}
                                        hideOnClick={true}
                                    >
                                        <div className="flex items-center font-notoSans text-sm leading-none text-gray-200 hover:border-b">
                                            <span>{reviews.ratingCount === 0 ? 'Unrated' : reviews.averageRating}</span>
                                            <FontAwesomeIcon className="mx-1" icon={faStar} />
                                            <span>{`(${reviews.ratingCount})`}</span>
                                        </div>
                                    </Tippy>
                                </div>
                                <SaveMovieButton movie={movie} />
                            </div>
                            <div>
                                <h1 className="font-notoSans text-2xl font-medium text-white lg:text-3xl 2xl:text-4xl">
                                    {movie && movie.isSeries ? `Episode ${activeEpisode.episodeNumber}` : 'Movie'}
                                </h1>
                            </div>

                            <div className={'mt-10'}>
                                <p className="text-gray-400">{activeEpisode.description}</p>
                            </div>

                            <div className={'mt-10'}>
                                <div className="flex justify-between border-b border-gray-900 py-4">
                                    <h3 className="font-medium">Genres</h3>
                                    <div>
                                        {movie.genres &&
                                            movie.genres.map((genre, index) => (
                                                <Link
                                                    className="round-lg border-gray-400 text-sm text-gray-400 hover:border-b"
                                                    key={genre._id}
                                                    to={`/search?genre=${genre.name}`}
                                                >
                                                    {genre.name}
                                                    {index === movie.genres.length - 1 ? '' : ', '}
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                                <div className="flex justify-between border-b border-gray-900 py-4">
                                    <h3 className="font-medium">Casts</h3>
                                    <div>
                                        {movie.casts &&
                                            movie.casts.map((cast, index) => (
                                                <Link
                                                    className="round-lg border-gray-400 text-sm text-gray-400 hover:border-b"
                                                    key={cast}
                                                    to={`/search?cast=${cast}`}
                                                >
                                                    {cast}
                                                    {index === movie.casts.length - 1 ? '' : ', '}
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                                <div className="flex justify-between border-b border-gray-900 py-4">
                                    <h3 className="font-medium">Directors</h3>
                                    <div>
                                        {movie.directors &&
                                            movie.directors.map((director, index) => (
                                                <Link
                                                    className="round-lg border-gray-400 text-sm text-gray-400 hover:border-b"
                                                    key={director}
                                                    to={`/search?director=${director}`}
                                                >
                                                    {director}
                                                    {index === movie.directors.length - 1 ? '' : ', '}
                                                </Link>
                                            ))}
                                    </div>
                                </div>

                                <div className="flex flex-col border-b border-gray-900 py-4">
                                    <h3 className="font-medium">Descriptions</h3>
                                    <p className={'text-md text-gray-400'}> {movie.description}</p>
                                </div>

                                <div>
                                    <Comment episodeId={activeEpisode._id} />
                                </div>
                            </div>
                        </BackgroundLines>
                    </div>

                    <div className="custom-scrollbar order-1 col-span-12 overflow-y-auto md:order-2 md:col-span-5 2xl:col-span-3">
                        <EpisodeList currentEpisode={activeEpisode} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const EpisodeList = ({ currentEpisode }) => {
    return (
        <div>
            <h3 className="mb-4 pl-2 text-sm font-bold uppercase">
                {currentEpisode.movie && currentEpisode.movie.isSeries ? 'Episode list' : 'Movie'}
            </h3>
            {currentEpisode.movie &&
                currentEpisode.movie.episodes &&
                episodeSort(currentEpisode.movie.episodes).map((episode, index) => (
                    <CardSpotlight
                        key={episode._id}
                        className={classNames('hidden p-0 md:flex', {
                            'pointer-events-none !flex bg-[#1d3225] brightness-75':
                                episode.episodeNumber === currentEpisode.episodeNumber,
                            '!flex': episode.episodeNumber === currentEpisode.episodeNumber + 1,
                        })}
                        color={'#070c09'}
                        dotColor={[
                            [22, 166, 79],
                            [27, 204, 97],
                            [33, 255, 121],
                        ]}
                    >
                        <Link
                            className={classNames(
                                'group/episode flex w-full gap-4 rounded-sm p-2 transition-all duration-200 ease-in-out md:flex',
                                {
                                    'pointer-events-none bg-[rgba(0,0,0,0.3)]':
                                        episode.episodeNumber === currentEpisode.episodeNumber,
                                },
                            )}
                            to={`/watch/${episode.mediaId}`}
                        >
                            <div className="relative">
                                <img
                                    className="h-auto max-w-40 rounded-sm object-contain"
                                    src={getFullResourceUrl(episode.thumbnailUrl)}
                                    alt=""
                                />
                                <span className="absolute bottom-0 right-0 m-1 block bg-[#0009] p-1 text-[12px] leading-none">
                                    {episode.duration}m
                                </span>
                                <FontAwesomeIcon
                                    icon={faPlay}
                                    className="absolute bottom-1/2 right-1/2 hidden translate-x-1/2 translate-y-1/2 text-2xl font-bold text-white group-hover/episode:block"
                                />
                            </div>
                            <div className="relative flex flex-col justify-around overflow-hidden">
                                <h3 className="text-md font-medium text-gray-300">
                                    EP{episode.episodeNumber} - {currentEpisode.movie.title}
                                </h3>
                                <p className="max-h-16 max-w-max overflow-hidden text-ellipsis text-[10px] text-gray-400">
                                    {episode.description}
                                </p>
                            </div>
                        </Link>
                    </CardSpotlight>
                ))}

            {currentEpisode.movie && currentEpisode.movie.isSeries && (
                <EpisodeListModal currentEpisode={currentEpisode}>
                    <button
                        type="button"
                        className="mb-2 me-2 mt-4 block w-full rounded-md border border-gray-600 px-5 py-2.5 text-center text-sm font-medium uppercase text-gray-400 hover:border-white hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-800 md:hidden"
                    >
                        See more episodes
                    </button>
                </EpisodeListModal>
            )}
        </div>
    );
};

EpisodeList.propTypes = {
    currentEpisode: PropTypes.object,
};

const EpisodeListModal = ({ children, currentEpisode = {} }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!isModalOpen);

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === 'Escape' && isModalOpen) {
                toggleModal();
            }
        }

        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isModalOpen]);

    return (
        <div>
            <div onClick={toggleModal}>{children}</div>
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        className="custom-scrollbar fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-primary"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleModal}
                    >
                        <motion.div
                            className="h-full w-full"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <CloseIcon toggleModal={toggleModal} />
                            <div className="flex h-16 max-w-max items-center px-6">
                                <FontAwesomeIcon className={'mr-2 text-xl'} icon={faCaretDown} />
                                <h1 className={'text-ellipsis text-nowrap text-2xl font-medium'}>
                                    {currentEpisode.movie && currentEpisode.movie.title}
                                </h1>
                            </div>
                            <div className="bg-[#0003] px-6 py-10">
                                <div className={'grid grid-cols-2 gap-4'}>
                                    {currentEpisode.movie &&
                                        currentEpisode.movie.episodes &&
                                        episodeSort(currentEpisode.movie.episodes).map((episode, index) => (
                                            <Link
                                                key={episode._id}
                                                to={`/watch/${episode.mediaId}`}
                                                className={classNames('group/episode col-span-1 hover:brightness-75', {
                                                    'pointer-events-none !brightness-50':
                                                        currentEpisode.episodeNumber === episode.episodeNumber,
                                                })}
                                                onClick={toggleModal}
                                            >
                                                <div className="relative">
                                                    <img
                                                        className={'w-full rounded-sm'}
                                                        src={getFullResourceUrl(episode.thumbnailUrl)}
                                                        alt=""
                                                    />
                                                    <span className="absolute bottom-0 right-0 z-50 m-1 block bg-[#0009] p-1 text-[12px] leading-none">
                                                        {episode.duration}m
                                                    </span>
                                                    <span className="absolute bottom-0 left-0 z-50 m-1 block bg-[#0009] p-1 text-[12px] leading-none">
                                                        Episode {episode.episodeNumber}
                                                    </span>
                                                    <FontAwesomeIcon
                                                        icon={faPlay}
                                                        className="absolute bottom-1/2 right-1/2 hidden translate-x-1/2 translate-y-1/2 text-2xl font-bold text-white group-hover/episode:block"
                                                    />
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

EpisodeListModal.propTypes = {
    currentEpisode: PropTypes.object,
    children: PropTypes.node,
};

const CloseIcon = ({ toggleModal }) => {
    return (
        <motion.button
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.05,
                },
            }}
            className="absolute right-0 top-0 m-2 flex items-center justify-around rounded-full bg-[#fff9] p-1 leading-none text-black"
            onClick={toggleModal}
        >
            <FontAwesomeIcon icon={faMultiply} className="size-5" />
        </motion.button>
    );
};

export default Watch;
