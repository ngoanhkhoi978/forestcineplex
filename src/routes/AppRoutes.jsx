import { publicRoutes, privateRoutes } from '~/routes/routes.js';
import React, { Fragment } from 'react';
import DefaultLayout from '~/layouts/user/index.js';
import { Navigate, Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ScrollToTop from '~/routes/ScrollToTop.jsx';
import { selectIsAuthenticated } from '~/features/user/userSelectors.js';

function AppRoutes() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                {publicRoutes.map((route) => {
                    const Page = route.component;
                    let Layout = route.layout === null ? Fragment : (route.layout ?? DefaultLayout);

                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                route.requiresGuest === false ? (
                                    <GuestRoute>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </GuestRoute>
                                ) : (
                                    <Layout>
                                        <Page />
                                    </Layout>
                                )
                            }
                        />
                    );
                })}

                {privateRoutes.map((route) => {
                    const Page = route.component;
                    let Layout = route.layout === null ? Fragment : (route.layout ?? DefaultLayout);

                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                    );
                })}
            </Routes>
        </>
    );
}

const GuestRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return !isAuthenticated ? children : <Navigate to="/home" />;
};
GuestRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default React.memo(AppRoutes);
