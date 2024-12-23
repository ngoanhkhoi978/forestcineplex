import Search from '~/layouts/DefaultLayout/Header/Search/Search.jsx';
import classNames from 'classnames';
import Navigation from '~/layouts/DefaultLayout/Header/Navigation/Navigation.jsx';
import Brand from '~/layouts/components/Brand/Brand.jsx';
import useScroll from '~/hooks/useScroll.js';
import BTNLanguage from '~/components/BTNLanguage/BTNLanguage.jsx';
import Avatar from '~/layouts/DefaultLayout/Header/AvatarMenu/Avatar/Avatar.jsx';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import Menu from '~/layouts/DefaultLayout/Header/AvatarMenu/Menu/Menu.jsx';
import Notifications from '~/layouts/DefaultLayout/Header/Notifications/Notifications.jsx';
import AvatarMenu from '~/layouts/DefaultLayout/Header/AvatarMenu/AvatarMenu.jsx';

function Header() {
    const isScroll = useScroll(300);
    return (
        <header
            className={classNames(
                'fixed end-0 start-0 top-0 z-40 h-header bg-ct-header-gradient transition-all duration-500',
                {
                    'hover:bg-primary': isScroll,
                },
            )}
        >
            <div className="container mx-auto flex h-full items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                    <Brand />
                    <Navigation />
                </div>
                <div className="flex items-center space-x-6">
                    <Search />
                    <Notifications />

                    <AvatarMenu />
                </div>
            </div>
        </header>
    );
}

export default Header;
