import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import BTNLanguage from '~/components/BTNLanguage/BTNLanguage.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faEarthAsia } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import ButtonLanguage from '~/layouts/user/DefaultLayout/Header/Menu/ButtonLanguage.jsx';
import { selectUser } from '~/features/user/userSelectors.js';
function Menu() {
    const user = useSelector(selectUser);

    return (
        <div className="group/avatar-menu h-max w-[200px] rounded-md bg-[rgba(2,23,7,0.95)] px-6 pb-2 pt-4">
            <ul>
                <li className="mb-1 w-full text-center text-white">{user.username}</li>
                <hr className="mb-3 border-t border-[#444444]" />
                {menuItems.map((menuItem, i) => (
                    <li key={i}>
                        {menuItem.separate && <hr className="mb-3 border-t border-[#444444]" />}
                        {menuItem.component ?? (
                            <Link to={menuItem.to} className="group/menu-item mb-1 flex items-center">
                                <span className="mr-3 text-2xl text-[#b3b3b3]">{menuItem.icon}</span>
                                <span className="text-sm text-white group-hover/menu-item:underline">
                                    {menuItem.title}
                                </span>
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

const menuItems = [
    {
        icon: <FontAwesomeIcon icon={faPenToSquare} />,
        title: 'Manage profile',
        to: '/profile',
    },
    {
        icon: '',
        title: 'Language',
        component: <ButtonLanguage />,
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Help center',
        to: '/help',
    },
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        title: 'Logout',
        to: '/logout',
        separate: true,
    },
];

export default Menu;
