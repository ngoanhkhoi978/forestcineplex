import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';

import { publicRoutes } from '~/routes/routes.js';
import DefaultLayout from './layouts';
import AppRoutes from '~/routes/AppRoutes.jsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </>
    );
}

export default App;
