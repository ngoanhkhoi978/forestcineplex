import Search from '~/layouts/user/DefaultLayout/Header/Search/Search.jsx';
import classNames from 'classnames';
import Navigation from '~/layouts/user/DefaultLayout/Header/Navigation/Navigation.jsx';
import Brand from '~/layouts/user/DefaultLayout/Header/Brand/Brand.jsx';
import useScroll from '~/hooks/useScroll.js';
import BTNLanguage from '~/components/BTNLanguage/BTNLanguage.jsx';
import AccountMenu from '~/layouts/user/DefaultLayout/Header/AccountMenu/AccountMenu.jsx';

function Header() {
    const isScrolled = useScroll();

    return (
        <header
            className={classNames('fixed end-0 start-0 top-0 z-40 h-header transition-all duration-500', {
                'bg-[#162b1b]': isScrolled,
                'bg-ct-header-gradient': !isScrolled,
            })}
        >
            <div className="container mx-auto flex h-full items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                    <Brand />
                    <Navigation />
                </div>
                <div className="flex space-x-4">
                    <Search />
                    <AccountMenu />

                    <BTNLanguage />
                </div>
            </div>
        </header>
    );
}

export default Header;
