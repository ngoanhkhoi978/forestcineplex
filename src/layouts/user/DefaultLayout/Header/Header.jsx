import Search from '~/layouts/user/DefaultLayout/Header/Search/Search.jsx';
import classNames from 'classnames';
import Navigation from '~/layouts/user/DefaultLayout/Header/Navigation/Navigation.jsx';
import Brand from '~/layouts/user/DefaultLayout/Header/Brand/Brand.jsx';
import useScroll from '~/hooks/useScroll.js';
import BTNLanguage from '~/components/BTNLanguage/BTNLanguage.jsx';
import AccountMenu from '~/layouts/user/DefaultLayout/Header/AccountMenu/AccountMenu.jsx';

import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import Menu from '~/layouts/user/DefaultLayout/Header/Menu/Menu.jsx';

function Header() {
    return (
        <header
            className={classNames(
                'fixed end-0 start-0 top-0 z-40 h-header bg-ct-header-gradient transition-all duration-500',
            )}
        >
            <div className="container mx-auto flex h-full items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                    <Brand />
                    <Navigation />
                </div>
                <div className="flex items-center space-x-4">
                    <Search />
                    <Tippy
                        render={(attrs) => <Menu {...attrs} />}
                        placement="bottom-start"
                        delay={[0, 100]}
                        interactive
                        offset={[0, 26]}
                        arrow={true}
                        // hideOnClick={true}
                    >
                        <div>
                            <AccountMenu />
                        </div>
                    </Tippy>
                </div>
            </div>
        </header>
    );
}

export default Header;
