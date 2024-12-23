import '~/index.css';
import PropTypes from 'prop-types';
import Header from '~/layouts/DefaultLayout/Header/Header.jsx';
import Footer from '~/layouts/DefaultLayout/Footer/Footer.jsx';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div className="min-h-screen bg-primary pb-32">{children}</div>
            <Footer />
        </>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
