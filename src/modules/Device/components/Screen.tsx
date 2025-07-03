import { useEffect } from 'react';
import { IconBrowser } from '@tabler/icons-react';

import { useForceUpdate } from '@/hooks';
import { throttle } from '@/utils';

import { Base, stringifyBoolean } from './Base';


const hasFeature = {
    isExtended: 'isExtended' in screen,
    orientation: 'orientation' in screen,
    maxTouchPoints: 'maxTouchPoints' in navigator,
};

export const Screen = () => {
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        const handleResize = throttle(forceUpdate, 100);

        const handleChangeOrientation = () => {
            forceUpdate();
        };

        window.addEventListener('resize', handleResize);
        if (hasFeature.orientation)
            screen.orientation.addEventListener('change', handleChangeOrientation);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (hasFeature.orientation)
                screen.orientation.removeEventListener('change', handleChangeOrientation);
        };
    }, []);

    const content = [
        ['all', `${screen.width}x${screen.height}`],
        ['client', `${screen.availWidth}x${screen.availHeight}`],
        ['viewport', `${window.innerWidth}x${window.innerHeight}`],
        ['color depth', `${screen.colorDepth}`],
        ['pixel depth', `${screen.pixelDepth}`],
    ];

    if (hasFeature.isExtended)
        content.push(['multiple screens', stringifyBoolean(screen.isExtended)]);
    if (hasFeature.orientation)
        content.push(['orientation', screen.orientation.type]);
    if (hasFeature.maxTouchPoints)
        content.push(['max touch points', `${navigator.maxTouchPoints}`]);
    content.push(['zoom', `${Math.round(devicePixelRatio * 100)}%`]);

    return (
        <Base
            Icon={IconBrowser}
            title="Screen"
            content={content}
        />
    );
};
