import images from '~/assets/images/index.js';
import { useNavigate } from 'react-router-dom';

function Brand() {
    const navigative = useNavigate();

    const handleOnClick = () => {
        navigative('/');
    };

    return (
        <div className="cursor-pointer" onClick={handleOnClick}>
            {/*Logo*/}
            <img className="h-12 w-auto duration-300 hover:scale-[1.3]" src={images.logoSVG} alt="" />
        </div>
    );
}

export default Brand;
