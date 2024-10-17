import config from '~/config/';
import Home from '~/pages/user/Home/Home.jsx';
import myList from '~/pages/user/MyList/MyList.jsx';
import News from '~/pages/user/News/News.jsx';

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
];
const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
