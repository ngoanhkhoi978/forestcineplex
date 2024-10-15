import config from '~/config/';
import Home from '~/pages/Home/Home.jsx';

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
        meta: { requiresAuth: false },
    },
    {
        path: config.routes.myList,
        component: Home,
        meta: { requiresAuth: false },
    },
];
const privateRoutes = [{}];

export { publicRoutes, privateRoutes };
