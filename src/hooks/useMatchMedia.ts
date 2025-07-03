import { useEffect, useState } from 'react';

import { throttle } from '@/utils';


const screenSizes = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1400,
};

type ScreenSize = keyof typeof screenSizes;

const sizes = Object.keys(screenSizes).sort((prev, next) =>
    screenSizes[next as ScreenSize] - screenSizes[prev as ScreenSize]) as ScreenSize[];

const findSize = (width: number) => sizes.find(size => width >= screenSizes[size]) as ScreenSize;

export const useMatchMedia = <T>(matches: Record<keyof typeof screenSizes, T>): T => {
    const [match, setMatch] = useState<ScreenSize>(() => findSize(window.innerWidth));

    useEffect(() => {
        const handleResize = throttle(() => {
            const newMatch = findSize(window.innerWidth);
            setMatch(newMatch);
        }, 100);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return matches[match];
};
