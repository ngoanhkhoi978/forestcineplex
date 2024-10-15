import images from '~/assets/images/index.js';

function Brand() {
    return (
        <div>
            <div>
                {/*Logo*/}
                <img className="h-12 w-auto duration-300 hover:scale-[1.5]" src={images.logoSVG} alt="" />
            </div>
        </div>
    );
}

export default Brand;
