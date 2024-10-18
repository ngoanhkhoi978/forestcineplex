import '~/index.css';
import PropTypes from 'prop-types';
import Header from '../componenets/Header/Header.jsx';
import Footer from '../componenets/Footer/Footer.jsx';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
            <div className="min-h-[2000px]"></div>
        </>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
