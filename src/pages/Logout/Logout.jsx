import { useEffect } from 'react';
import { logout as logoutAPI } from '~/services/authService.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '~/features/user/userSlice.js';

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        logoutAPI().then(() => {
            dispatch(logout());
            navigate('/');
        });
    }, []);
    return <div className="h-screen w-full bg-primary"></div>;
}

export default Logout;
