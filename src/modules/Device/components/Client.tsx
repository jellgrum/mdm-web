import { useEffect, useState } from 'react';
import UAParser from 'ua-parser-js';
import { IconDeviceLaptop } from '@tabler/icons-react';

import { getReadableBytes } from '@/utils';

import { Base, stringifyBoolean } from './Base';


interface ClientProps {
    browser: ReturnType<UAParser['getBrowser']>;
    engine: ReturnType<UAParser['getEngine']>;
}

const hasFeature = {
    pdfViewerEnabled: 'pdfViewerEnabled' in navigator,
    estimateStorage: 'storage' in navigator && 'estimate' in navigator.storage,
};

export const Client = ({ browser, engine }: ClientProps) => {
    const [storageQuota, setStorageQuota] = useState('');

    useEffect(() => {
        const handleEstimateStorage = async () => {
            if (!hasFeature.estimateStorage) return;

            const estimate = await navigator.storage.estimate();
            const percent = ((estimate.usage! / estimate.quota!) * 100).toFixed(0);
            const quota = getReadableBytes(estimate.quota!);

            setStorageQuota(`${quota} (${percent}% used)`);
        };

        handleEstimateStorage();
    }, []);

    const content = [
        ['browser', `${browser.name} ${browser.version}`],
        ['engine', `${engine.name} ${engine.version}`],
        ['language', navigator.language],
        ['cookies', stringifyBoolean(navigator.cookieEnabled)],
    ];

    if (hasFeature.pdfViewerEnabled)
        content.push(['PDF viewer', stringifyBoolean(navigator.pdfViewerEnabled)]);
    if (hasFeature.estimateStorage)
        content.push(['storage quota', storageQuota]);

    return (
        <Base
            Icon={IconDeviceLaptop}
            title="Client"
            content={content}
        />
    );
};
