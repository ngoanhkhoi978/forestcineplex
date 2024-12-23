import Header from '~/layouts/SecondLayout/Header/Header.jsx';
import PropTypes from 'prop-types';
import Footer from '~/layouts/DefaultLayout/Footer/Footer.jsx';

function SecondLayout({ children }) {
    return (
        <>
            <Header />
            <div className="box-content min-h-screen bg-primary">{children}</div>
        </>
    );
}

SecondLayout.propTypes = {
    children: PropTypes.node,
};

export default SecondLayout;
