import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import config from '~/config/index.js';
import { Buffer } from 'buffer';

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

// .catch((err) => {
//     if (err.response && err.response.data.validators) {
//         const errorObj = {};
//         err.response.data.validators.forEach((error) => {
//             if (errorObj[error.path]) {
//                 errorObj[error.path] += '. ' + error.msg;
//             } else {
//                 errorObj[error.path] = error.msg;
//             }
//         });
//         setValidators(errorObj);
//     }
// });

export function parseValidationErrors(err) {
    const errorObj = {};
    if (err.response && err.response.data.validators) {
        err.response.data.validators.forEach((error) => {
            if (errorObj[error.path]) {
                errorObj[error.path] += '. ' + error.msg;
            } else {
                errorObj[error.path] = error.msg;
            }
        });
    }
    return errorObj;
}

export function resizeImage(file, targetWidth, targetHeight, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext('2d');

            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            canvas.toBlob((blob) => {
                const resizedFile = new File([blob], file.name, { type: file.type });
                callback(resizedFile);
            }, file.type);
        };
    };
    reader.readAsDataURL(file);
}

export function getAvatarSrc(avatar) {
    if (!avatar) {
        return '';
    }

    if (typeof avatar === 'string') {
        return `data:image/jpeg;base64,${avatar}`;
    }

    if (avatar?.type === 'Buffer' && Array.isArray(avatar.data)) {
        const base64String = Buffer.from(avatar.data).toString('base64');
        return `data:image/jpeg;base64,${base64String}`;
    }
}
