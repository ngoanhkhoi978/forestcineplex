import Header from '~/pages/user/NotFound/Header.jsx';
import { BoxesCore } from '~/components/ui-aceternity/BackgroundBoxes/BoxesCore.jsx';
import { useEffect } from 'react';
import images from '~/assets/images/index.js';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const preventScroll = (e) => {
            e.preventDefault();
        };

        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });

        return () => {
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
        };
    }, []);

    const handleOnClick = () => {
        navigate('/');
    };

    return (
        <div className="relative h-screen w-screen overflow-hidden bg-green-700">
            <Header />
            <div className="relative flex h-[92%] w-full flex-col items-center justify-center overflow-hidden bg-slate-900">
                <BoxesCore />
                <div className="pointer-events-none absolute right-1/2 top-1/4 flex translate-x-1/2 flex-col items-center">
                    <h1 className="glitch-text pr-6 text-9xl text-white text-shadow-lg">404</h1>
                    <h2 className="mt-6 text-4xl font-bold text-white">Lost your way?</h2>
                    <h3 className="mb-6 mt-6 text-white">
                        Sorry, we can't find that page. You'll find lots to explore on the home page.
                    </h3>
                    <button onClick={handleOnClick} className="btn btn--outline pointer-events-auto">
                        Home page
                    </button>
                </div>
            </div>
            <img
                className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 translate-y-[25%]"
                src={images.plantForwardFooter}
                alt=""
            />
        </div>
    );
}

export default NotFound;
