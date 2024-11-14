import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/index.js';
import 'tippy.js/dist/tippy.css';

function AccountMenu() {
    return (
        <div className="group/avatar-menu flex cursor-pointer items-center space-x-1">
            <img className="w-8 rounded-xl" src={images.avatar} alt="" />
            <FontAwesomeIcon
                className="hidden transform text-xl text-white transition-transform duration-300 ease-in-out group-hover/avatar-menu:rotate-180 sm:inline"
                icon={faCaretDown}
            />
        </div>
    );
}

export default AccountMenu;
