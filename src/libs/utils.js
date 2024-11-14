import { clsx } from 'clsx';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(classNames(inputs));
}
