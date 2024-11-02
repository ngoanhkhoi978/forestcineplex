import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function NavigationItem({ menuItem }) {
    const { t } = useTranslation();

    const [isHover, setIsHover] = useState(false);
    const handleOnMouseEnter = useCallback(() => setIsHover(true), []);
    const handleOnMouseLeave = useCallback(() => setIsHover(false), []);
    const location = useLocation();

    return (
        <li
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
            className={classNames(
                location.pathname === menuItem.path ? 'text-white' : 'text-[#e5e5e5]',
                'flex flex-col items-center text-lg',
            )}
        >
            {<Link to={menuItem.path}>{t(menuItem.title)}</Link>}
            <div
                className={classNames('h-[2px] rounded-3xl transition-all duration-300', {
                    'w-full': isHover || location.pathname === menuItem.path,
                    'w-0': !isHover,
                    'bg-[#ccc]': location.pathname !== menuItem.path,
                    'bg-white': isHover || location.pathname === menuItem.path,
                })}
            ></div>
        </li>
    );
}

NavigationItem.propTypes = {
    menuItem: PropTypes.object.isRequired,
};

export default NavigationItem;
