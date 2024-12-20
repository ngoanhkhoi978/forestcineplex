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
                primary: '#070c09',
            },
            container: {
                center: false,
                padding: '2px',
                screens: {
                    default: '640px',
                    sm: '768px',
                    md: '1024px',
                    lg: '1280px',
                    xl: '1536px',
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
            fontFamily: {
                firaSansCondensed: ['Fira Sans Condensed', 'sans-serif'],
                notoSans: ['Noto Sans', 'sans-serif'],
            },
            animation: {
                aurora: 'aurora 60s linear infinite',
                shimmer: 'shimmer 4s linear infinite',
            },
            keyframes: {
                aurora: {
                    from: {
                        backgroundPosition: '50% 50%, 50% 50%',
                    },
                    to: {
                        backgroundPosition: '350% 50%, 350% 50%',
                    },
                },
                shimmer: {
                    from: {
                        backgroundPosition: '0 0',
                    },
                    to: {
                        backgroundPosition: '-200% 0',
                    },
                },
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
