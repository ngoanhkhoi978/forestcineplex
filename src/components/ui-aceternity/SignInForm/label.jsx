// Label component extends from shadcnui - https://ui.shadcn.com/docs/components/label
'use client';
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '~/utils/utils.js';

// eslint-disable-next-line react/prop-types
const Label = React.forwardRef(({ className, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(
            'text-sm font-medium leading-none text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white',
            className,
        )}
        {...props}
    />
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
