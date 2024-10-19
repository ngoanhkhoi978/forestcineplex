/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            height: {
                header: '80px',
            },
            margin: {
                header: '80px',
            },
            padding: {
                header: '80px',
            },
            backgroundImage: {
                'ct-header-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 10%, transparent)',
            },
            colors: {
                'black-75': 'rgba(0, 0, 0, 0.75)',
            },
            container: {
                center: false,
                padding: '0',
                screens: {
                    default: '940px',
                    sm: '940px',
                    md: '1068px',
                    lg: '1224px',
                    xl: '1480px',
                    '2xl': '1736px',
                },
            },
        },
    },

    plugins: [],
};
