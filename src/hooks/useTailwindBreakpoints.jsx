import { useMediaQuery } from 'react-responsive';

const useTailwindBreakpoints = () => {
    const isSm = useMediaQuery({ minWidth: 640 });
    const isMd = useMediaQuery({ minWidth: 768 });
    const isLg = useMediaQuery({ minWidth: 1024 });
    const isXl = useMediaQuery({ minWidth: 1280 });
    const is2Xl = useMediaQuery({ minWidth: 1536 });

    return { isSm, isMd, isLg, isXl, is2Xl };
};

export default useTailwindBreakpoints;
