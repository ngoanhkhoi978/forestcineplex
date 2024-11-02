'use client';
// import Image from 'next/image';
import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import useOutsideClick from '~/hooks/useOutsideClick.js';
import images from '~/assets/images/index.js';

export function ExpandableCardDemo() {
    const [active, setActive] = useState(null);
    const id = useId();
    const ref = useRef(null);

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
                            className="custom-scrollbar flex h-full w-full max-w-[500px] flex-col overflow-y-auto overflow-x-hidden bg-white sm:rounded-3xl md:h-fit md:max-h-[90%] dark:bg-neutral-900"
                        >
                            {/*Poster*/}
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <img className="w-full" src={images.imageMovie} alt="" />
                            </motion.div>

                            <div>
                                <div className="flex items-start justify-between p-4">
                                    <div className="">
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="text-base font-medium text-neutral-700 dark:text-neutral-200"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.description}-${id}`}
                                            className="text-base text-neutral-600 dark:text-neutral-400"
                                        >
                                            {active.description}
                                        </motion.p>
                                    </div>

                                    <motion.a
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        href={active.ctaLink}
                                        target="_blank"
                                        className="rounded-full bg-green-500 px-4 py-3 text-sm font-bold text-white"
                                    >
                                        {active.ctaText}
                                    </motion.a>
                                </div>
                                {/*Content*/}
                                <div className="relative px-4 pt-4">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] md:h-fit md:text-sm lg:text-base dark:text-neutral-400"
                                    >
                                        {typeof active.content === 'function' ? active.content() : active.content}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <ul className="mx-auto grid w-full grid-cols-5 items-start gap-1">
                {cards.map((card, index) => (
                    <motion.div
                        layoutId={`card-${card.title}-${id}`}
                        key={card.title}
                        onClick={() => setActive(card)}
                        className="flex cursor-pointer flex-col rounded-xl hover:shadow"
                    >
                        <div className="flex w-full flex-col gap-4">
                            <motion.div layoutId={`image-${card.title}-${id}`}>
                                <img className="w-full rounded-md" src={images.imageMovie} alt="" />
                            </motion.div>
                            <div className="flex flex-col items-center justify-center">
                                <motion.h3
                                    layoutId={`title-${card.title}-${id}`}
                                    className="text-center text-base font-medium text-neutral-800 md:text-left dark:text-neutral-200"
                                >
                                    {card.title}
                                </motion.h3>
                                {/*<motion.p*/}
                                {/*    layoutId={`description-${card.description}-${id}`}*/}
                                {/*    className="text-center text-base text-neutral-600 md:text-left dark:text-neutral-400"*/}
                                {/*>*/}
                                {/*    {card.description}*/}
                                {/*</motion.p>*/}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </ul>
        </>
    );
}

export const CloseIcon = () => {
    return (
        <motion.svg
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
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    );
};

const cards = [
    {
        description: 'Lana Del Rey',
        title: 'Summertime Sadness',
        src: 'https://assets.aceternity.com/demos/lana-del-rey.jpeg',
        ctaText: 'Visit',
        ctaLink: 'https://ui.aceternity.com/templates',
        content: () => {
            return (
                <p>
                    Lana Del Rey, an iconic American singer-songwriter, is celebrated for her melancholic and cinematic
                    music style. Born Elizabeth Woolridge Grant in New York City, she has captivated audiences worldwide
                    with her haunting voice and introspective lyrics. <br /> <br />
                    Her songs often explore themes of tragic romance, glamour, and melancholia, drawing inspiration from
                    both contemporary and vintage pop culture. With a career that has seen numerous critically acclaimed
                    albums, Lana Del Rey has established herself as a unique and influential figure in the music
                    industry, earning a dedicated fan base and numerous accolades.
                </p>
            );
        },
    },
];
