import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';

function Rating() {
    const [score, setScore] = useState(2);
    return (
        <div className="fontRoboto h-64 w-72 rounded-sm bg-[#111e16] p-4">
            <div className="">
                <div className={'mb-1 text-sm font-medium text-gray-300'}>
                    <p>Average 5 out of 5 stars</p>
                </div>
                <div className={'flex'}>
                    <Star
                        className={classNames('size-6', {
                            'text-yellow-500': score >= 1,
                        })}
                        onClick={() => setScore((pre) => (pre === 1 ? 0 : 1))}
                    />
                    <Star
                        className={classNames('size-6', {
                            'text-yellow-500': score >= 2,
                        })}
                        onClick={() => setScore((pre) => (pre === 2 ? 0 : 2))}
                    />
                    <Star
                        className={classNames('size-6', {
                            'text-yellow-500': score >= 3,
                        })}
                        onClick={() => setScore((pre) => (pre === 3 ? 0 : 3))}
                    />
                    <Star
                        className={classNames('size-6', {
                            'text-yellow-500': score >= 4,
                        })}
                        onClick={() => setScore((pre) => (pre === 4 ? 0 : 4))}
                    />
                    <Star
                        className={classNames('size-6', {
                            'text-yellow-500': score >= 5,
                        })}
                        onClick={() => setScore((pre) => (pre === 5 ? 0 : 5))}
                    />
                </div>
                <div className={'mt-6 text-sm italic text-gray-300'}>
                    <p>1 ratings</p>
                </div>
                <div className={'space-y-1'}>
                    <div className={'flex items-center space-x-2'}>
                        <StarSolid />
                        <span>5</span>
                        <progress value={100} className={'h-2'} />
                        <span>100%</span>
                    </div>
                    <div className={'flex items-center space-x-2'}>
                        <StarSolid />
                        <span>4</span>
                        <progress value={0} className={'h-2'} />
                        <span>0%</span>
                    </div>
                    <div className={'flex items-center space-x-2'}>
                        <StarSolid />
                        <span>3</span>
                        <progress value={0} className={'h-2'} />
                        <span>0%</span>
                    </div>
                    <div className={'flex items-center space-x-2'}>
                        <StarSolid />
                        <span>2</span>
                        <progress value={0} className={'h-2'} />
                        <span>0%</span>
                    </div>
                    <div className={'flex items-center space-x-2'}>
                        <StarSolid />
                        <span>1</span>
                        <progress value={0} className={'h-2'} />
                        <span>0%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Star = ({ className, onClick }) => (
    <svg
        className={classNames('size-4 text-gray-500', className)}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
        onClick={onClick}
    >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
);

Star.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
};

const StarSolid = ({ className }) => (
    <svg
        className={classNames('size-4 text-yellow-300', className)}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
    >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
);

StarSolid.propTypes = {
    className: PropTypes.string,
};

const StarRegular = ({ className }) => (
    <svg
        className={classNames('size-4 text-gray-500', className)}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
    >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
);

StarRegular.propTypes = {
    className: PropTypes.string,
};

export default Rating;
