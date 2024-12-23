import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import Menu from '~/layouts/DefaultLayout/Header/AvatarMenu/Menu/Menu.jsx';
import Avatar from '~/layouts/DefaultLayout/Header/AvatarMenu/Avatar/Avatar.jsx';
import { useState } from 'react';

function AvatarMenu() {
    const [isShow, setIsShow] = useState(false);
    return (
        <Tippy
            render={(attrs) => <Menu {...attrs} />}
            placement="bottom-start"
            delay={[0, 100]}
            interactive
            offset={[0, 26]}
            arrow={true}
            trigger={'click'}
            onTrigger={() => setIsShow((pre) => !pre)}
            onHide={() => setIsShow((pre) => !pre)}
        >
            <div>
                <Avatar isShow={isShow} />
            </div>
        </Tippy>
    );
}

export default AvatarMenu;
