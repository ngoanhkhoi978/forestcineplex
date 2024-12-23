import navigationItems from './navigationItems.js';
import NavigationItem from '~/layouts/DefaultLayout/Header/Navigation/NavigationItem.jsx';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

function Navigation() {
    return (
        <>
            <ul className="hidden items-center space-x-3 md:inline-flex">
                {navigationItems.map((menuItem) => (
                    <NavigationItem key={menuItem.path} menuItem={menuItem} />
                ))}
            </ul>
            <MobileNavigation />
        </>
    );
}

const MobileNavigation = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const [isTippyOpen, setIsTippyOpen] = useState(false);

    const currentLocation = navigationItems.find((item) => item.path === location.pathname);

    useEffect(() => {
        setIsTippyOpen(false);
    }, [location.pathname]);

    return (
        <Tippy
            render={(attrs) => <MobileNavigationList />}
            trigger={'click'}
            hideOnClick={true}
            interactive
            arrow={true}
            placement="bottom-start"
            visible={isTippyOpen}
            onClickOutside={() => setIsTippyOpen(false)}
        >
            <div
                className={'flex cursor-pointer items-center justify-center space-x-1 text-lg text-white md:hidden'}
                onClick={() => setIsTippyOpen((pre) => !pre)}
            >
                <p>{currentLocation && t(currentLocation.title)}</p>
                <FontAwesomeIcon icon={faCaretDown} />
            </div>
        </Tippy>
    );
};

const MobileNavigationList = () => {
    const { t } = useTranslation();
    return (
        <ul className={'min-w-56 md:hidden'}>
            {navigationItems.map((menuItem, index) => (
                <Link to={menuItem.path} key={index}>
                    <li
                        className={classNames('text-md bg-black/90 py-2 text-center text-gray-400 hover:bg-black/80', {
                            '!font-medium !text-white': location.pathname === menuItem.path,
                        })}
                    >
                        {t(menuItem.title)}
                    </li>
                </Link>
            ))}
        </ul>
    );
};

export default Navigation;
