import { useEffect } from 'react';
import { login } from '~/services/authService.js';
import { get } from '~/services/apiService.js';

function Welcome() {
    useEffect(() => {
        login({
            username: 'admin',
            password: 'admin',
        })
            .then((data) => console.log(data.data))
            .catch((err) => {
                console.log(err.response.data);
                console.log(err);
            });
    }, []);

    useEffect(() => {});

    return <div></div>;
}

export default Welcome;
