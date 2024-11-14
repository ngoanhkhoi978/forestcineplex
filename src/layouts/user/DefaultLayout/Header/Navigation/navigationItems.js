import config from '~/config/index.js';

const navigationItems = [
    { title: 'home', path: config.routes.home },
    { title: 'tv-shows', path: config.routes.tvShows },
    { title: 'movies', path: config.routes.movies },
    { title: 'my-list', path: config.routes.myList },
    { title: 'news', path: config.routes.news },
];

export default navigationItems;
