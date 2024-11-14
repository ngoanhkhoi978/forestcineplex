import PropTypes from 'prop-types';
import { useState } from 'react';

function Carousel({ children }) {
    console.log(children);

    const lengthItem = children.length;

    const [index, setIndex] = useState(0);
    const [column, setColumn] = useState(1);

    const handleNextButton = () => {
        setIndex((prev) => prev + 1);
    };
    const handlePrevButton = () => {
        setIndex((prev) => prev - 1);
    };

    return (
        <div className="max-h-min max-w-min">
            <div className="flex">
                <button onClick={handlePrevButton}>prev</button>
                <div className="grid flex-grow grid-rows-2">{children[index]}</div>
                <button onClick={handleNextButton}>next</button>
            </div>
            <h1>{index}</h1>
        </div>
    );
}

Carousel.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Carousel;
