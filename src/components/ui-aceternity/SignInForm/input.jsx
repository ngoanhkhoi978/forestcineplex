// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
'use client';
import * as React from 'react';
import { cn } from '~/libs/utils.js';
import { useMotionTemplate, useMotionValue, motion } from 'framer-motion';

// eslint-disable-next-line react/prop-types
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    const radius = 100; // change this to increase the rdaius of the hover effect
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();

        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
    return (
        <motion.div
            style={{
                background: useMotionTemplate`radial-gradient(${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,var(--green-500),transparent 80%)`,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            className="group/input rounded-lg p-[2px] transition"
        >
            <input
                type={type}
                className={cn(
                    `dark:placeholder-text-neutral-600 duration-400 z-50 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black shadow-input transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-[1px] focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:focus-visible:ring-neutral-600`,
                    className,
                )}
                ref={ref}
                {...props}
            />
        </motion.div>
    );
});
Input.displayName = 'Input';

export { Input };
