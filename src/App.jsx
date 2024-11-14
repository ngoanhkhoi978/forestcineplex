import { BrowserRouter } from 'react-router-dom';
import { Fragment, useLayoutEffect, useEffect, useState, Suspense, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '~/features/authentication/authenticationSlice.js';
import { verifyToken } from '~/services/authService.js';
import AppRoutes from '~/routes/AppRoutes.jsx';

const Fallback = () => <div className="h-screen w-screen bg-primary"></div>;

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        verifyToken().then((result) => {
            if (result.success) {
                dispatch(login(result.user));
            }
            setLoading(false);
        });
    }, [dispatch]);

    if (loading) {
        return;
    }

    return (
        <>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </>
    );
}

export default App;
