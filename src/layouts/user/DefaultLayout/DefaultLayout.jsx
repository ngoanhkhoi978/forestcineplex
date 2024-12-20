import '~/index.css';
import PropTypes from 'prop-types';
import Header from '~/layouts/user/DefaultLayout/Header/Header.jsx';
import Footer from '~/layouts/user/DefaultLayout/Footer/Footer.jsx';
import Notifications from '~/layouts/components/Notifications/Notifications.jsx';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-primary">
                {children}
                <Notifications />
            </div>
            <Footer />
        </>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
