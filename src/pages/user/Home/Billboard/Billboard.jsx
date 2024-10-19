import images from '~/assets/images/index.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Billboard({ className }) {
    return (
        <div className="relative z-10">
            <img className="w-full" src={images.imageBillboard} alt="" />
            <div className="container absolute bottom-0 left-0 right-0 top-0 mx-auto">
                <img className="absolute left-0 top-0 w-1/2" src={images.titleMovie} alt="" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/6 bg-gradient-to-t from-[#162b1b]/100 to-transparent"></div>
        </div>
    );
}

Billboard.propTypes = {
    className: PropTypes.string,
};
export default Billboard;
