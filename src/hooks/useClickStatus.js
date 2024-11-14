import { useState, useEffect } from 'react';

function useClickStatus() {
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        const handleUserClick = () => setIsClicked(true);

        window.addEventListener('click', handleUserClick);

        return () => {
            window.removeEventListener('click', handleUserClick);
        };
    }, []);

    return isClicked;
}

export default useClickStatus;
