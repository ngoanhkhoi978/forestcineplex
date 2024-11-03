import { BrowserRouter } from 'react-router-dom';
import { Fragment, useLayoutEffect } from 'react';

import AppRoutes from '~/routes/AppRoutes.jsx';
import { useDispatch } from 'react-redux';
import { login } from '~/features/authentication/authenticationSlice.js';

function App() {
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(login({ user: null, token }));
        }
    }, [dispatch]);

    return (
        <>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </>
    );
}

export default App;
