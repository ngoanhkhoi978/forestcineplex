import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import config from '~/config/index.js';

export function cn(...inputs) {
    return twMerge(classNames(inputs));
}

export const getFullResourceUrl = (relativePath) => `${config.baseURL}${relativePath}`;
