/** @type {import('tailwindcss').Config} */
import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette';
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
                primary: '#162b1b',
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
            textShadow: {
                sm: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                md: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                lg: '3px 3px 6px rgba(0, 0, 0, 0.5)',
            },
            boxShadow: {
                input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
            },
        },
    },

    plugins: [
        addVariablesForColors,
        function ({ addUtilities }) {
            addUtilities({
                '.text-shadow-sm': {
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                },
                '.text-shadow-md': {
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                },
                '.text-shadow-lg': {
                    textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
                },
            });
        },
    ],
};

function addVariablesForColors({ addBase, theme }) {
    let allColors = flattenColorPalette(theme('colors'));
    let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

    addBase({
        ':root': newVars,
    });
}
