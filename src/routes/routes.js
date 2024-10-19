import config from '~/config/';
import Home from '~/pages/user/Home/Home.jsx';
import myList from '~/pages/user/MyList/MyList.jsx';
import News from '~/pages/user/News/News.jsx';
import Search from '~/pages/user/Search/Search.jsx';
import Movies from '~/pages/user/Movies/Movies.jsx';
import TVShows from '~/pages/user/TVShows/TVShows.jsx';

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
        meta: { requiresAuth: false },
    },
    {
        path: config.routes.myList,
        component: myList,
        meta: { requiresAuth: false },
    },
    {
        path: config.routes.news,
        component: News,
        meta: { requiresAuth: false },
    },
    {
        path: config.routes.search,
        component: Search,
        meta: { requiresAuth: false },
    },
    {
        path: config.routes.movies,
        component: Movies,
        meta: { requiresAuth: false },
    },
    {
        path: config.routes.tvShows,
        component: TVShows,
        meta: { requiresAuth: false },
    },
];
const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
