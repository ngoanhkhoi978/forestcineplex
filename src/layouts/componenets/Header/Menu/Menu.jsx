import menuItems from './menuItems.js';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Menu() {
    const { t } = useTranslation();
    const location = useLocation();

    return (
        <ul className="flex items-center space-x-1">
            {menuItems.map((menuItem) => (
                <li
                    className={location.pathname === menuItem.path ? 'text-white' : 'text-[#e5e5e5]'}
                    key={menuItem.path}
                >
                    {<Link to={menuItem.path}>{t(menuItem.title)}</Link>}
                </li>
            ))}
        </ul>
    );
}

export default Menu;
