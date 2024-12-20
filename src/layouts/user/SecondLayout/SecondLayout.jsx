import Header from '~/layouts/user/SecondLayout/Header/Header.jsx';
import PropTypes from 'prop-types';

function SecondLayout({ children }) {
    return (
        <>
            <Header />
            <div className="bg-primary">{children}</div>
        </>
    );
}

SecondLayout.propTypes = {
    children: PropTypes.node,
};

export default SecondLayout;
