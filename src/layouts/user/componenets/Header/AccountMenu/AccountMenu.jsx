import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images/index.js';
import { useCallback, useState } from 'react';
import classNames from 'classnames';

function AccountMenu() {
    const [isHovered, setHovered] = useState(false);

    const handleMouseEnter = useCallback(() => setHovered(true), []);
    const handleMouseLeave = useCallback(() => setHovered(false), []);

    return (
        <div
            className="flex cursor-pointer items-center space-x-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img className="w-8 rounded-full" src={images.avatar} alt="" />
            <FontAwesomeIcon
                className={classNames(
                    'hidden transform text-xl text-white transition-transform duration-300 ease-in-out sm:inline',
                    {
                        'rotate-180': isHovered,
                    },
                )}
                icon={faCaretDown}
            />
        </div>
    );
}

export default AccountMenu;
