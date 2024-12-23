import { BrowserRouter } from 'react-router-dom';
import { Fragment, useLayoutEffect, useEffect, useState, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from '~/routes/AppRoutes.jsx';
import { getUserFavouriteMovies } from '~/features/favorites/favouriteThunk.js';
import { verifyTokenUser } from '~/features/user/userThunk.js';
import config from '~/config/index.js';
import { connectSocket } from '~/features/socket/socketThunk.js';
import { sendMessage } from '~/features/socket/socketSlice.js';
import { selectUser } from '~/features/user/userSelectors.js';

function App() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const { connected, hasSetRole, socket } = useSelector((state) => state.socket);
    const user = useSelector(selectUser);

    useEffect(() => {
        if (user) {
            if (connected) {
                if (!hasSetRole) {
                    dispatch(
                        sendMessage({
                            type: 'setRole',
                            message: '',
                        }),
                    );
                }

                socket.on('connect', () => {
                    dispatch(
                        sendMessage({
                            type: 'setRole',
                            message: '',
                        }),
                    );
                });
            }

            dispatch(getUserFavouriteMovies(user._id));
        }
    }, [connected, user]);

    useEffect(() => {
        dispatch(verifyTokenUser());
        dispatch(connectSocket(config.baseURL));
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
