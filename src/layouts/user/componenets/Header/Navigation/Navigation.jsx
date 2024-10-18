import navigationItems from './navigationItems.js';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Navigation() {
    const { t } = useTranslation();
    const location = useLocation();

    return (
        <ul className="flex items-center space-x-3">
            {navigationItems.map((menuItem) => (
                <li
                    className={
                        location.pathname === menuItem.path ? 'border-b-2 border-gray-200 text-white' : 'text-[#e5e5e5]'
                    }
                    key={menuItem.path}
                >
                    {<Link to={menuItem.path}>{t(menuItem.title)}</Link>}
                </li>
            ))}
        </ul>
    );
}

export default Navigation;
