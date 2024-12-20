import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import config from '~/config/index.js';

export function cn(...inputs) {
    return twMerge(classNames(inputs));
}

export const getFullResourceUrl = (relativePath) => `${config.baseURL}${relativePath}`;

export const episodeSort = (episodes, reverse) =>
    episodes.sort((a, b) =>
        (a.episodeNumber > b.episodeNumber && !reverse) || (a.episodeNumber < b.episodeNumber && reverse) ? 1 : -1,
    );

export function formatTime(date) {
    if (typeof date === 'string') {
        date = new Date(date);
    }

    // Kiểm tra tính hợp lệ của đối tượng Date
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return 'error';
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

export function formatDate(date) {
    try {
        if (typeof date === 'string') {
            date = new Date(date);
        }

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear());

        return `${year}/${month}/${day}`;
    } catch (err) {
        return 'Error format';
    }
}
