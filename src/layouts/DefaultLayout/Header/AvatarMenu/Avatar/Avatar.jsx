import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/index.js';
import 'tippy.js/dist/tippy.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { selectUser } from '~/features/user/userSelectors.js';
import { getAvatarSrc } from '~/utils/utils.js';

function Avatar({ isShow }) {
    const user = useSelector(selectUser);

    return (
        <div className="flex cursor-pointer items-center space-x-1">
            <img className="w-8 rounded-md" src={user.avatar ? getAvatarSrc(user.avatar) : images.avatar} alt="" />
            <FontAwesomeIcon
                className={classNames(
                    'hidden transform text-xl text-white transition-transform duration-300 ease-in-out sm:inline',
                    { 'rotate-180': isShow },
                )}
                icon={faCaretDown}
            />
        </div>
    );
}

Avatar.propTypes = {
    isShow: PropTypes.bool.isRequired,
};

export default Avatar;
