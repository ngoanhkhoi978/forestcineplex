import { publicRoutes } from '~/routes/routes.js';
import { Fragment } from 'react';
import DefaultLayout from '~/layouts/index.js';
import { Route, Routes } from 'react-router-dom';

function AppRoutes() {
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
                    ></Route>
                );
            })}
        </Routes>
    );
}

export default AppRoutes;
