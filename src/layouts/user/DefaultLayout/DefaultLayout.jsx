import '~/index.css';
import PropTypes from 'prop-types';
import Header from '../componenets/Header/Header.jsx';
import Footer from '../componenets/Footer/Footer.jsx';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div className="min-h-[5000px] bg-[#162b1b]">{children}</div>
            <Footer />
        </>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
