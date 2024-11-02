import navigationItems from './navigationItems.js';
import NavigationItem from '~/layouts/user/DefaultLayout/Header/Navigation/NavigationItem.jsx';

function Navigation() {
    return (
        <ul className="flex hidden items-center space-x-3 md:inline-flex">
            {navigationItems.map((menuItem) => (
                <NavigationItem key={menuItem.path} menuItem={menuItem} />
            ))}
        </ul>
    );
}

export default Navigation;
