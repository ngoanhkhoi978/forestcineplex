/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'ct-header-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 10%, transparent)',
            },
            colors: {
                'black-75': 'rgba(0, 0, 0, 0.75)',
            },
        },
    },
    plugins: [],
};
