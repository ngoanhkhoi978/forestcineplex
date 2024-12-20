import Brand from '~/layouts/components/Brand/Brand.jsx';

function Header() {
    return (
        <header
            className={
                'fixed end-0 start-0 top-0 z-40 flex h-header items-center bg-ct-header-gradient transition-all duration-500'
            }
        >
            <div className="container mx-auto">
                <Brand />
            </div>
        </header>
    );
}

export default Header;
