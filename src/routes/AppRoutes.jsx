import { publicRoutes, privateRoutes } from '~/routes/routes.js';
import { Fragment } from 'react';
import DefaultLayout from '~/layouts/user/index.js';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function AppRoutes() {
    const isAuthenticated = useSelector((state) => state.authenticated.true);
    console.log(isAuthenticated);

    return (
        <Routes>
            {publicRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = route.layout === null ? Fragment : (route.layout ?? DefaultLayout);

                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <Layout>
                                <Page />
                            </Layout>
                        }
                    />
                );
            })}

            {privateRoutes.map((route, index) => {
                const Page = route.component;
                let Layout = route.layout === null ? Fragment : (route.layout ?? DefaultLayout);

                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            isAuthenticated ? (
                                <Layout>
                                    <Page />
                                </Layout>
                            ) : (
                                <Navigate to={'/login'} />
                            )
                        }
                    />
                );
            })}
        </Routes>
    );
}

export default AppRoutes;
