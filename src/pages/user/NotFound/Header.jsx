import images from '~/assets/images/index.js';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigative = useNavigate();

    const handleOnClick = () => {
        navigative('/');
    };

    return (
        <header className="relative z-50 bg-primary">
            <div className="container mx-auto flex h-[70px] items-center">
                <div className="flex cursor-pointer items-center" onClick={handleOnClick}>
                    <img className="h-12 w-auto duration-300 hover:scale-[1.3]" src={images.logoSVG} alt="" />
                </div>
            </div>
        </header>
    );
}

export default Header;
