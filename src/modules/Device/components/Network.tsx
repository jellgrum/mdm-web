import { useEffect, useState } from 'react';
import { IconNetwork } from '@tabler/icons-react';

import { useForceUpdate } from '@/hooks';

import { Base, stringifyBoolean } from './Base';


const hasFeature = {
    connection: 'connection' in navigator,
    typeNetwork: 'type' in navigator.connection,
    downLink: 'downlink' in navigator.connection,
    maxDownLink: 'downlinkMax' in navigator.connection,
    effectiveType: 'effectiveType' in navigator.connection,
    rtt: 'rtt' in navigator.connection,
    saveData: 'saveData' in navigator.connection,
    bluetooth: 'bluetooth' in navigator,
};

export const Network = () => {
    const [hasBluetoothSupport, setHasBluetoothSupport] = useState<boolean | undefined>();
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        if (hasFeature.connection)
            navigator.connection.onchange = forceUpdate;

        const handleBluetoothSupport = async () => {
            if (!hasFeature.bluetooth) return;

            const hasSupport = await navigator.bluetooth.getAvailability();
            setHasBluetoothSupport(hasSupport);
        };

        handleBluetoothSupport();

        window.addEventListener('offline', forceUpdate);

        return () => {
            window.addEventListener("online", forceUpdate);
        };
    }, []);

    const content = [
        ['online', stringifyBoolean(navigator.onLine)],
    ];

    if (hasFeature.typeNetwork)
        content.push(['type', navigator.connection.type!]);
    if (hasFeature.effectiveType)
        content.push(['effective type', navigator.connection.effectiveType]);
    if (hasFeature.downLink)
        content.push(['downlink', `~${navigator.connection.downlink}Mb/s`]);
    if (hasFeature.maxDownLink)
        content.push(['downlink max', `~${navigator.connection.downlinkMax}Mb/s`]);
    if (hasFeature.rtt)
        content.push(['rtt', `~${navigator.connection.rtt}ms`]);
    if (hasFeature.saveData)
        content.push(['save data', stringifyBoolean(navigator.connection.saveData)]);
    content.push([
        'bluetooth support',
        typeof hasBluetoothSupport === 'boolean'
            ? stringifyBoolean(hasBluetoothSupport)
            : 'N/A',
    ]);

    return (
        <Base
            Icon={IconNetwork}
            title="Network"
            content={content}
        />
    );
};
