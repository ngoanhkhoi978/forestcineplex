import Search from '~/layouts/user/componenets/Header/Search/Search.jsx';
import classNames from 'classnames';
import Navigation from '~/layouts/user/componenets/Header/Navigation/Navigation.jsx';
import Brand from '~/layouts/user/componenets/Header/Brand/Brand.jsx';
import useScroll from '~/hooks/useScroll.js';
import BTNLanguage from '~/components/BTNLanguage/BTNLanguage.jsx';
import AccountMenu from '~/layouts/user/componenets/Header/AccountMenu/AccountMenu.jsx';

function Header() {
    const isScrolled = useScroll();

    return (
        <header
            className={classNames('h-header fixed end-0 start-0 top-0 transition-all duration-500', {
                'bg-[#162b1b]': isScrolled,
                'bg-ct-header-gradient': !isScrolled,
            })}
        >
            <div className="container mx-auto flex h-full items-center justify-between p-2">
                <div className="flex items-center space-x-2">
                    <Brand />
                    <Navigation />
                </div>
                <div className="flex space-x-2">
                    <Search />
                    <AccountMenu />

                    <BTNLanguage />
                    <button type="submit"></button>
                </div>
            </div>
        </header>
    );
}

export default Header;
