import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { receiveNotification } from '~/features/socket/socketSlice.js';

function Notifications() {
    const dispatch = useDispatch();
    const { connected, socket, notifications } = useSelector((state) => state.socket);

    useEffect(() => {
        if (connected) {
            socket.on('notification', (notification) => {
                dispatch(receiveNotification(notification));
            });
        }
    }, [dispatch, socket, connected]);

    console.log(notifications);

    return (
        <div className="fixed bottom-[20px] right-[20px] z-50 h-32 w-96 rounded-2xl bg-green-700/50 p-4">
            <h1 className={'mb-2 text-xl font-medium text-white'}></h1>
            <p className="text-white">hello</p>
        </div>
    );
}

export default Notifications;
