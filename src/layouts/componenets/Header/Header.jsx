import { useEffect, useState } from 'react';

import images from '~/assets/images';
import Search from '~/layouts/componenets/Header/Search/Search.jsx';
import classNames from 'classnames';
import { CaretDownOutlined } from '@ant-design/icons';
import Navigation from '~/layouts/componenets/Header/Navigation/Navigation.jsx';
import Brand from '~/layouts/componenets/Header/Brand/Brand.jsx';
import useScroll from '~/hooks/useScroll.js';

function Header() {
    const isScrolled = useScroll();

    return (
        <header
            className={classNames('fixed end-0 start-0 top-0 h-[70px] transition-all duration-500', {
                'bg-[#162b1b]': isScrolled,
                'bg-ct-header-gradient': !isScrolled,
            })}
        >
            <div className="container mx-auto flex h-full items-center justify-between p-2">
                <div className="flex items-center">
                    <Brand />
                    <Navigation />
                </div>
                <div className="flex">
                    <Search />
                    <div className="flex items-center">
                        <img src="" alt="" />
                        <CaretDownOutlined className="text-white" />
                    </div>
                    <button type="submit"></button>
                </div>
            </div>
        </header>
    );
}

export default Header;
