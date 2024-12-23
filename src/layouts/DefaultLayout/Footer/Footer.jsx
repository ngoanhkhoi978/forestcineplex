import images from '~/assets/images/index.js';

function Footer() {
    return (
        <footer className="flex select-none flex-col bg-gradient-to-t from-black to-[#070c09]">
            <img
                src={images.forestFooter}
                className={'pointer-events-none h-56 w-full object-cover object-top'}
                alt=""
            />
            <div className={'h-56 bg-[#033330]'}>1</div>
        </footer>
    );
}

export default Footer;
