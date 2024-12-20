import { useState, Children, useEffect } from 'react';
import PropTypes from 'prop-types';
import useTailwindBreakpoints from '~/hooks/useTailwindBreakpoints.jsx';

function Slider({
    children,
    options = {
        '2xl': 1,
        xl: 1,
        lg: 1,
        md: 1,
        sm: 1,
        default: 1,
    },
}) {
    const [items, setItems] = useState(Children.toArray(children));
    const [activeItems, setActiveItems] = useState([]);
    const { isSm, isMd, isLg, isXl, is2Xl } = useTailwindBreakpoints();
    const [itemCount, setItemCount] = useState(1);
    const [index, setIndex] = useState(0);
    const [isSliding, setIsSliding] = useState(false); // Trạng thái hiệu ứng

    useEffect(() => {
        if (is2Xl) {
            setItemCount(options['2xl']);
        } else if (isXl) {
            setItemCount(options.xl);
        } else if (isLg) {
            setItemCount(options.lg);
        } else if (isMd) {
            setItemCount(options.md);
        } else if (isSm) {
            setItemCount(options.sm);
        } else {
            setItemCount(options.default);
        }
    }, [isSm, isMd, isLg, isXl, is2Xl]);

    useEffect(() => {
        if (!isSliding) {
            setActiveItems(items.slice(index * itemCount, Math.min(index * itemCount + itemCount, items.length)));
        }
    }, [itemCount, index, isSliding]);

    const handleNext = () => {
        if (index < Math.floor(items.length / itemCount)) {
            triggerSlide(() => setIndex((prevIndex) => prevIndex + 1));
        }
    };

    const handlePrev = () => {
        if (index > 0) {
            triggerSlide(() => setIndex((prevIndex) => prevIndex - 1));
        }
    };

    const triggerSlide = (updateIndex) => {
        setIsSliding(true); // Bắt đầu hiệu ứng
        setTimeout(() => {
            updateIndex();
            setIsSliding(false); // Kết thúc hiệu ứng
        }, 300); // Delay khớp với thời gian hiệu ứng CSS
    };

    return (
        <div className="relative flex overflow-hidden">
            <div className="min-w-10 cursor-pointer bg-blue-700" onClick={handlePrev}>
                pre
            </div>
            <div
                className={`grid grid-cols-12 gap-4 transition-transform duration-500 ease-in-out ${
                    isSliding ? 'translate-x-[-100%] transform' : 'translate-x-0 transform'
                }`}
            >
                {activeItems.map((active, index) => (
                    <div className="col-span-6 md:col-span-4 xl:col-span-2" key={index}>
                        {active}
                    </div>
                ))}
            </div>
            <div className="min-w-10 cursor-pointer bg-blue-700" onClick={handleNext}>
                next
            </div>
        </div>
    );
}

Slider.propTypes = {
    children: PropTypes.node,
    options: PropTypes.object,
};

export default Slider;
