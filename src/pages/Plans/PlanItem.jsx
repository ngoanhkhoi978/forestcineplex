'use client';
import React, { useCallback } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { CanvasRevealEffect } from '~/components/ui-aceternity/CanvasRevealEffect/CanvasRevealEffect.jsx';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { selectSubscriptionPlan } from '~/features/user/userSelectors.js';
import { choosePlan } from '~/services/meService.js';
import { setUser } from '~/features/user/userSlice.js';
import { useToast } from '~/providers/ToastProvider.jsx';

function PlanItem({ className, colors, details }) {
    const [hovered, setHovered] = React.useState(false);
    const subscriptionPlan = useSelector(selectSubscriptionPlan);
    const dispatch = useDispatch();
    const { showToast } = useToast();

    const handleOnClick = useCallback(() => {
        choosePlan(details.name).then((user) => {
            dispatch(setUser(user));
            showToast('Select subscription plan successfully', 'success', 3000);
        });
    }, []);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={classNames(
                'relative mx-auto flex flex-col gap-4 overflow-hidden px-10 md:px-4 lg:flex-row 2xl:px-8',
                className,
            )}
        >
            <div className={'relative z-20 h-full cursor-pointer'} onClick={handleOnClick}>
                <p className="mx-auto my-8 max-w-2xl text-center text-2xl font-medium text-gray-200 md:text-2xl">
                    {details?.name}
                </p>
                <ul>
                    {details?.descriptions &&
                        details.descriptions.map((description, index) => (
                            <li key={index} className={'mb-3 flex text-gray-300'}>
                                <CheckSVG />
                                {description}
                            </li>
                        ))}
                </ul>
                <div className={'absolute bottom-0 flex w-full justify-between py-8 text-xl text-white'}>
                    <div>{subscriptionPlan === details.name && <p className={'text-green-300'}>Active plan</p>}</div>
                    <div>{details?.price ? <p>${details?.price}</p> : <p>Free</p>}</div>
                </div>
            </div>
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 h-full w-full"
                    >
                        <CanvasRevealEffect
                            animationSpeed={5}
                            containerClassName="bg-transparent"
                            colors={
                                colors ?? [
                                    [59, 130, 246],
                                    [139, 92, 246],
                                ]
                            }
                            opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
                            dotSize={2}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

PlanItem.propTypes = {
    className: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    details: PropTypes.object,
};

const CheckSVG = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-blue-500"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path
            d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
            fill="currentColor"
            strokeWidth="0"
        ></path>
    </svg>
);

export default PlanItem;
