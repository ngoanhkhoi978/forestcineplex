/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            height: {
                header: '70px',
            },
            margin: {
                header: '70px',
            },
            backgroundImage: {
                'ct-header-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 10%, transparent)',
            },
            colors: {
                'black-75': 'rgba(0, 0, 0, 0.75)',
            },
        },
    },

    // eslint-disable-next-line no-undef
    plugins: [require('tailwind-scrollbar')],
};
