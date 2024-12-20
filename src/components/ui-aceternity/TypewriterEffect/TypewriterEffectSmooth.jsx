import { cn } from '~/utils/utils.js';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const TypewriterEffectSmooth = ({ words, className, cursorClassName }) => {
    // split text inside of words into array of characters
    const wordsArray = words.map((word) => {
        return {
            ...word,
            text: word.text.split(''),
        };
    });
    const renderWords = () => {
        return (
            <div>
                {wordsArray.map((word, idx) => {
                    return (
                        <div key={`word-${idx}`} className="inline-block">
                            {word.text.map((char, index) => (
                                <span
                                    key={`char-${index}`}
                                    className={cn(`text-black dark:text-white`, word.className)}
                                >
                                    {char}
                                </span>
                            ))}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={cn('my-6 flex space-x-1', className)}>
            <motion.div
                className="overflow-hidden pb-2"
                initial={{
                    width: '0%',
                }}
                whileInView={{
                    width: 'fit-content',
                }}
                transition={{
                    duration: 2,
                    ease: 'linear',
                    delay: 1,
                }}
            >
                <div
                    className="lg:text:3xl text-xs font-bold sm:text-base md:text-xl xl:text-5xl"
                    style={{
                        whiteSpace: 'nowrap',
                    }}
                >
                    {renderWords()}{' '}
                </div>{' '}
            </motion.div>
            <motion.span
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.8,

                    repeat: Infinity,
                    repeatType: 'reverse',
                }}
                className={cn('block h-6 w-[4px] rounded-sm bg-blue-500 sm:h-10 xl:h-12', cursorClassName)}
            ></motion.span>
        </div>
    );
};

TypewriterEffectSmooth.propTypes = {
    words: PropTypes.array.isRequired,
    className: PropTypes.string,
    cursorClassName: PropTypes.string,
};

export default TypewriterEffectSmooth;
