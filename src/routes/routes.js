import config from '~/config/';
import Home from '~/pages/Home/Home.jsx';
import myList from '~/pages/MyList/MyList.jsx';
import News from '~/pages/News/News.jsx';
import Search from '~/pages/Search/Search.jsx';
import Movies from '~/pages/Movies/Movies.jsx';
import TVShows from '~/pages/TVShows/TVShows.jsx';
import Welcome from '~/pages/Welcome/Welcome.jsx';
import NotFound from '~/pages/NotFound/NotFound.jsx';
import Login from '~/pages/Login/Login.jsx';
import Watch from '~/pages/Watch/Watch.jsx';
import SecondLayout from '~/layouts/SecondLayout/SecondLayout.jsx';
import Test from '~/pages/Test/Test.jsx';
import Logout from '~/pages/Logout/Logout.jsx';
import Register from '~/pages/Register/Register.jsx';
import ForgotPassword from '~/pages/ForgotPassword/ForgotPassword.jsx';
import Plans from '~/pages/Plans/Plans.jsx';
import Profile from '~/pages/Profile/Profile.jsx';

// default layout = DefaultLayout

const publicRoutes = [
    {
        path: config.routes.login,
        component: Login,
        layout: null,
        requiresGuest: false,
    },
    {
        path: config.routes.forgotPassword,
        component: ForgotPassword,
        layout: null,
        requiresGuest: false,
    },

    {
        path: config.routes.welcome,
        component: Welcome,
        layout: SecondLayout,
        requiresGuest: false,
    },
    {
        path: '*',
        component: NotFound,
        layout: SecondLayout,
    },
    {
        path: '/test',
        component: Test,
        layout: null,
    },
    {
        path: config.routes.register,
        component: Register,
        layout: null,
        requiresGuest: false,
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
    {
        path: config.routes.watch,
        component: Watch,
    },
    {
        path: config.routes.logout,
        component: Logout,
        layout: null,
    },
    {
        path: config.routes.plans,
        component: Plans,
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: SecondLayout,
    },
];

export { publicRoutes, privateRoutes };
