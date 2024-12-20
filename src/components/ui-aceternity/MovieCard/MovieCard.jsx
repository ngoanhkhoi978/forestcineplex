'use client';
// import Image from 'next/image';
import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useOutsideClick from '~/hooks/useOutsideClick.js';
import images from '~/assets/images/index.js';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { formatDate, formatTime, getFullResourceUrl } from '~/utils/utils.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMultiply, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import VideoJS from '~/components/VideoPlayer/VideoJS.jsx';
import { getFullMediaUrl } from '~/services/movieService.js';

export function MovieCard({ className, movie }) {
    const [active, setActive] = useState(null);
    const id = useId();
    const ref = useRef(null);
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        function onKeyDown(event) {
            if (event.key === 'Escape') {
                setActive(false);
            }
        }

        if (active && typeof active === 'object') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <>
            <AnimatePresence>
                {active && typeof active === 'object' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-10 h-full w-full bg-black/20"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === 'object' ? (
                    <div className="fixed inset-0 z-[100] grid place-items-center">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
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
                            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white lg:hidden"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="custom-scrollbar flex h-full w-full max-w-[800px] flex-col overflow-y-auto overflow-x-hidden bg-white sm:rounded-3xl md:h-fit md:max-h-[95%] dark:bg-neutral-900"
                        >
                            {/*Poster*/}
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <div className="pointer-events-none relative">
                                    <img
                                        className="absolute bottom-0 left-0 right-0 top-0 w-full"
                                        src={getFullResourceUrl(active.coverImageUrl)}
                                        alt=""
                                    />
                                    <VideoJS
                                        options={{
                                            autoplay: true,
                                            controls: false,
                                            mute: false,
                                            fluid: true,
                                            responsive: true,
                                            sources: [
                                                {
                                                    src: getFullResourceUrl(active.trailerUrl),
                                                    type: 'application/x-mpegURL',
                                                    withCredentials: true,
                                                },
                                            ],
                                        }}
                                    />
                                </div>
                            </motion.div>

                            <div>
                                <div className="flex items-center justify-between p-4">
                                    <div className="">
                                        {/*Release date & episodes */}
                                        <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
                                            {`${formatDate(movie.releaseDate)} ${movie.episodes.length} Episodes`}
                                        </p>
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="text-4xl font-medium text-neutral-700 dark:text-neutral-200"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <p className="text-base text-neutral-600 dark:text-neutral-400">
                                            {active.genres.map((genre) => {
                                                return (
                                                    <Link
                                                        key={genre.name}
                                                        className="text-gray-300 hover:border-b"
                                                        to={`/search?genre=${genre.name}`}
                                                    >
                                                        {t(genre.name)}
                                                        {', '}
                                                    </Link>
                                                );
                                            })}
                                        </p>
                                    </div>

                                    {/*Button play*/}
                                    <motion.button
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className={classNames(
                                            'select-none rounded-3xl bg-green-500 px-7 py-3 text-lg font-bold text-white hover:bg-green-600',
                                            {
                                                'pointer-events-none brightness-50': active.episodes.length === 0,
                                            },
                                        )}
                                        onClick={() => navigate(`/watch/${movie.episodes[0].mediaId}`)}
                                    >
                                        {t('play')}
                                    </motion.button>
                                </div>
                                {/*description & casts*/}
                                <div className="relative grid grid-cols-12 gap-4 px-4 pt-4">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="col-span-8 flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] md:h-fit md:text-sm lg:text-base dark:text-neutral-400"
                                    >
                                        {active.description}
                                    </motion.div>
                                    <div className="col-span-4">
                                        <div>
                                            <p className="text-sm text-neutral-400">
                                                Cast:{' '}
                                                {active.casts.map((cast, index) => (
                                                    <Link
                                                        key={index}
                                                        className="text-gray-300 hover:border-b"
                                                        to={`/search?cast=${cast}`}
                                                    >
                                                        {cast},{' '}
                                                    </Link>
                                                ))}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/*Show episodes*/}
                                <div className="px-4">
                                    <div className="flex justify-between">
                                        <h1 className="text-2xl font-bold text-white">
                                            {active.isSeries ? 'Episodes' : 'Movie'}
                                        </h1>
                                        <h3 className="text-lg text-gray-300">{active.title}</h3>
                                    </div>
                                    <div>
                                        {active.episodes.map((episode, index) => (
                                            <Link
                                                to={`/watch/${episode.mediaId}`}
                                                key={index}
                                                className="group/episode flex border-b border-[#404040] p-4"
                                            >
                                                <div className="hidden items-center group-hover/episode:brightness-75 md:flex">
                                                    <h1 className="px-4 text-2xl text-gray-300">
                                                        {episode.episodeNumber}
                                                    </h1>
                                                </div>
                                                <div className="relative flex max-w-[20%] items-center">
                                                    <img
                                                        className="rounded-lg object-cover group-hover/episode:brightness-75"
                                                        src={getFullResourceUrl(episode.thumbnailUrl)}
                                                        alt=""
                                                    />
                                                    <FontAwesomeIcon
                                                        icon={faPlay}
                                                        className="absolute bottom-1/2 right-1/2 hidden translate-x-1/2 translate-y-1/2 text-2xl font-bold text-white group-hover/episode:block"
                                                    />
                                                </div>

                                                <div className="w-full px-4 group-hover/episode:brightness-75">
                                                    <div className="mb-2 flex justify-between text-gray-200">
                                                        {movie.isSeries ? (
                                                            <h4>Episode {episode.episodeNumber}</h4>
                                                        ) : (
                                                            <h4>Movie</h4>
                                                        )}
                                                        <h5>{`${episode.duration}m`}</h5>
                                                    </div>
                                                    <p className="text-sm text-gray-400">{episode.description}</p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                {/*More information*/}
                                <div className="mt-12 min-h-32 px-4">
                                    <h1 className="text-2xl text-white">
                                        About <b>{active.title}</b>
                                    </h1>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <ul className={classNames('mx-auto w-full select-none items-start gap-1', className)}>
                <motion.div
                    layoutId={`card-${movie.title}-${id}`}
                    key={movie.title}
                    onClick={() => setActive(movie)}
                    className="flex cursor-pointer flex-col rounded-xl hover:shadow"
                >
                    <div className="flex w-full flex-col gap-0">
                        <motion.div layoutId={`image-${movie.title}-${id}`}>
                            <img className="w-full rounded-md" src={getFullResourceUrl(movie.thumbnailUrl)} alt="" />
                        </motion.div>
                        <div className="flex items-center justify-center">
                            <motion.h3
                                layoutId={`title-${movie.title}-${id}`}
                                className="overflow-hidden text-ellipsis text-nowrap text-center text-base font-medium text-neutral-800 md:text-left dark:text-neutral-200"
                            >
                                {movie.title}
                            </motion.h3>
                            {/*<motion.p*/}
                            {/*    layoutId={`genres-${movie.genres}-${id}`}*/}
                            {/*    className="text-center text-base text-neutral-600 md:text-left dark:text-neutral-400"*/}
                            {/*>*/}
                            {/*    {movie.genres}*/}
                            {/*</motion.p>*/}
                        </div>
                    </div>
                </motion.div>
            </ul>
        </>
    );
}

export const CloseIcon = () => {
    return (
        <motion.div
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
            className="z-50 flex items-center justify-around rounded-full bg-[#fff9] p-1 leading-none text-black"
        >
            <FontAwesomeIcon icon={faMultiply} className="size-5" />
        </motion.div>
    );
};

MovieCard.propTypes = {
    className: PropTypes.string,
    movie: PropTypes.object,
};

// const movie = {
//     genres: ['korean', 'tv-comedies', 'romantic'],
//     title: 'Queen of tears',
//     casts: ['Kim Soo-huyn', 'Kim Ji-won', 'Park Sung-hoon'],
//     releaseDate: '9/3/2024',
//     episodes: [
//         {
//             mediaId: 'movie_2',
//             description:
//                 'Baek Hyun-woo and Hong Hae-in navigate a tense relationship, both at home and at work. But upon deciding his future, Hyun-woo pays a visit to his family.',
//             thumbnailUrl: 'http://192.168.2.103:3000/public/thumbnails/movie_2/movie_2-episode1.jpg',
//             episodeNumber: '1',
//             duration: 77,
//         },
//         {
//             mediaId: 'movie_2',
//             description:
//                 'Baek Hyun-woo and Hong Hae-in navigate a tense relationship, both at home and at work. But upon deciding his future, Hyun-woo pays a visit to his family.',
//             thumbnailUrl: 'http://192.168.2.103:3000/public/thumbnails/movie_2/movie_2-episode1.jpg',
//             episodeNumber: '2',
//             duration: 77,
//         },
//         {
//             mediaId: 'movie_2',
//             description:
//                 'Baek Hyun-woo and Hong Hae-in navigate a tense relationship, both at home and at work. But upon deciding his future, Hyun-woo pays a visit to his family.',
//             thumbnailUrl: 'http://192.168.2.103:3000/public/thumbnails/movie_2/movie_2-episode1.jpg',
//             episodeNumber: '3',
//             duration: 77,
//         },
//         {
//             mediaId: 'movie_2',
//             description:
//                 'Baek Hyun-woo and Hong Hae-in navigate a tense relationship, both at home and at work. But upon deciding his future, Hyun-woo pays a visit to his family.',
//             thumbnailUrl: 'http://192.168.2.103:3000/public/thumbnails/movie_2/movie_2-episode1.jpg',
//             episodeNumber: '4',
//             duration: 77,
//         },
//         {
//             mediaId: 'movie_2',
//             description:
//                 'Baek Hyun-woo and Hong Hae-in navigate a tense relationship, both at home and at work. But upon deciding his future, Hyun-woo pays a visit to his family.',
//             thumbnailUrl: 'http://192.168.2.103:3000/public/thumbnails/movie_2/movie_2-episode1.jpg',
//             episodeNumber: '5',
//             duration: 77,
//         },
//         {
//             mediaId: 'movie_2',
//             description:
//                 'Baek Hyun-woo and Hong Hae-in navigate a tense relationship, both at home and at work. But upon deciding his future, Hyun-woo pays a visit to his family.',
//             thumbnailUrl: 'http://192.168.2.103:3000/public/thumbnails/movie_2/movie_2-episode1.jpg',
//             episodeNumber: '6',
//             duration: 77,
//         },
//         {
//             mediaId: 'movie_2',
//             description:
//                 'Baek Hyun-woo and Hong Hae-in navigate a tense relationship, both at home and at work. But upon deciding his future, Hyun-woo pays a visit to his family.',
//             thumbnailUrl: 'http://192.168.2.103:3000/public/thumbnails/movie_2/movie_2-episode1.jpg',
//             episodeNumber: '7',
//             duration: 77,
//         },
//         {
//             mediaId: 'movie_2',
//             description:
//                 'Baek Hyun-woo and Hong Hae-in navigate a tense relationship, both at home and at work. But upon deciding his future, Hyun-woo pays a visit to his family.',
//             thumbnailUrl: 'http://192.168.2.103:3000/public/thumbnails/movie_2/movie_2-episode1.jpg',
//             episodeNumber: '8',
//             duration: 77,
//         },
//         {
//             mediaId: 'movie_2',
//             description:
//                 'Baek Hyun-woo and Hong Hae-in navigate a tense relationship, both at home and at work. But upon deciding his future, Hyun-woo pays a visit to his family.',
//             thumbnailUrl: 'http://192.168.2.103:3000/public/thumbnails/movie_2/movie_2-episode1.jpg',
//             episodeNumber: '9',
//             duration: 77,
//         },
//         {
//             mediaId: 'movie_2',
//             description:
//                 'Baek Hyun-woo and Hong Hae-in navigate a tense relationship, both at home and at work. But upon deciding his future, Hyun-woo pays a visit to his family.',
//             thumbnailUrl: 'http://192.168.2.103:3000/public/thumbnails/movie_2/movie_2-episode1.jpg',
//             episodeNumber: '10',
//             duration: 77,
//         },
//         {
//             mediaId: 'movie_2',
//             description:
//                 'Baek Hyun-woo and Hong Hae-in navigate a tense relationship, both at home and at work. But upon deciding his future, Hyun-woo pays a visit to his family.',
//             thumbnailUrl: 'http://192.168.2.103:3000/public/thumbnails/movie_2/movie_2-episode1.jpg',
//             episodeNumber: '11',
//             duration: 77,
//         },
//         {
//             mediaId: 'movie_2',
//             description:
//                 'Baek Hyun-woo and Hong Hae-in navigate a tense relationship, both at home and at work. But upon deciding his future, Hyun-woo pays a visit to his family.',
//             thumbnailUrl: 'http://192.168.2.103:3000/public/thumbnails/movie_2/movie_2-episode1.jpg',
//             episodeNumber: '12',
//             duration: 77,
//         },
//         {
//             mediaId: 'movie_2',
//             description:
//                 'Baek Hyun-woo and Hong Hae-in navigate a tense relationship, both at home and at work. But upon deciding his future, Hyun-woo pays a visit to his family.',
//             thumbnailUrl: 'http://192.168.2.103:3000/public/thumbnails/movie_2/movie_2-episode1.jpg',
//             episodeNumber: '13',
//             duration: 77,
//         },
//         {
//             mediaId: 'movie_2',
//             description:
//                 'Baek Hyun-woo and Hong Hae-in navigate a tense relationship, both at home and at work. But upon deciding his future, Hyun-woo pays a visit to his family.',
//             thumbnailUrl: 'http://192.168.2.103:3000/public/thumbnails/movie_2/movie_2-episode1.jpg',
//             episodeNumber: '14',
//             duration: 77,
//         },
//         {
//             mediaId: 'movie_2',
//             description:
//                 'Baek Hyun-woo and Hong Hae-in navigate a tense relationship, both at home and at work. But upon deciding his future, Hyun-woo pays a visit to his family.',
//             thumbnailUrl: 'http://192.168.2.103:3000/public/thumbnails/movie_2/movie_2-episode1.jpg',
//             episodeNumber: '15',
//             duration: 77,
//         },
//         {
//             mediaId: 'movie_2',
//             description:
//                 'Baek Hyun-woo and Hong Hae-in navigate a tense relationship, both at home and at work. But upon deciding his future, Hyun-woo pays a visit to his family.',
//             thumbnailUrl: 'http://192.168.2.103:3000/public/thumbnails/movie_2/movie_2-episode1.jpg',
//             episodeNumber: '16',
//             duration: 77,
//         },
//     ],
//
//     description:
//         "In this drama praised by TIME as 'fresh and transformative,' an heiress and her husband face the tumultuous waters of marriage amid chaos in their lives.",
// };
