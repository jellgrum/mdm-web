import UAParser from 'ua-parser-js';
import { IconAutomation } from '@tabler/icons-react';

import { Base } from './Base';


interface HardwareProps {
    os: ReturnType<UAParser['getOS']>;
    cpu: ReturnType<UAParser['getCPU']>;
    device: ReturnType<UAParser['getDevice']>;
}

const hasFeature = {
    deviceMemory: 'deviceMemory' in navigator,
    hardwareConcurrency: 'hardwareConcurrency' in navigator,
};

export const Hardware = ({ os, cpu, device }: HardwareProps) => {
    const content = [
        ['OS', `${os.name} ${os.version}`],
        ['cpu arch', cpu.architecture || 'N/A'],
        ['device', device.model ? `${device.model} (${device.type || 'N/A'})` : 'N/A'],
    ];

    if (hasFeature.hardwareConcurrency)
        content.push(['LCPU', `${navigator.hardwareConcurrency}x`]);
    if (hasFeature.deviceMemory)
        content.push(['RAM', `≥ ${navigator.deviceMemory} GiB`]);

    return (
        <Base
            Icon={IconAutomation}
            title="Hardware"
            content={content}
        />
    );
};
