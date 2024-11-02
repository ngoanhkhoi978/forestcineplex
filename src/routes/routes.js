import config from '~/config/';
import Home from '~/pages/user/Home/Home.jsx';
import myList from '~/pages/user/MyList/MyList.jsx';
import News from '~/pages/user/News/News.jsx';
import Search from '~/pages/user/Search/Search.jsx';
import Movies from '~/pages/user/Movies/Movies.jsx';
import TVShows from '~/pages/user/TVShows/TVShows.jsx';
import Welcome from '~/pages/user/Welcome/Welcome.jsx';
import NotFound from '~/pages/user/NotFound/NotFound.jsx';
import Login from '~/pages/user/Login/Login.jsx';

const publicRoutes = [
    {
        path: '*',
        component: NotFound,
        layout: null,
    },

    {
        path: config.routes.login,
        component: Login,
        layout: null,
    },
    {
        path: config.routes.welcome,
        component: Welcome,
    },
];
const privateRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.myList,
        component: myList,
    },
    {
        path: config.routes.news,
        component: News,
    },
    {
        path: config.routes.search,
        component: Search,
    },
    {
        path: config.routes.movies,
        component: Movies,
    },
    {
        path: config.routes.tvShows,
        component: TVShows,
    },
];

export { publicRoutes, privateRoutes };
