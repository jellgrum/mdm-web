import { useEffect, useState } from 'react';
import { IconDeviceMobileCharging } from '@tabler/icons-react';

import { getReadableTime } from '@/utils';

import { Base, stringifyBoolean } from './Base';


const hasFeature = {
    battery: 'getBattery' in navigator,
};

export const Battery = () => {
    const [batteryInfo, updateBatteryInfo] = useState({
        isCharging: true,
        level: 1,
        chargingTime: Infinity,
        dischargingTime: Infinity,
    });

    useEffect(() => {
        if (!hasFeature.battery) return;

        const handleBatteryInfo = async () => {
            const battery = await navigator.getBattery();
            if (!battery) return;

            const updateIsCharging = () => {
                updateBatteryInfo(batteryInfo => ({
                    ...batteryInfo,
                    isCharging: battery.charging,
                }));
            };

            const updateLevel = () => {
                updateBatteryInfo(batteryInfo => ({
                    ...batteryInfo,
                    level: battery.level,
                }));
            };

            const updateChargingTime = () => {
                updateBatteryInfo(batteryInfo => ({
                    ...batteryInfo,
                    chargingTime: battery.chargingTime,
                }));
            };

            const updateDischargingTime = () => {
                updateBatteryInfo(batteryInfo => ({
                    ...batteryInfo,
                    dischargingTime: battery.dischargingTime,
                }));
            };

            updateIsCharging();
            updateLevel();
            updateChargingTime();
            updateDischargingTime();

            battery.onchargingchange = updateIsCharging;
            battery.onlevelchange = updateLevel;
            battery.onchargingtimechange = updateChargingTime;
            battery.ondischargingtimechange = updateDischargingTime;
        };

        handleBatteryInfo();
    }, []);

    return (
        <Base
            Icon={IconDeviceMobileCharging}
            title="Battery"
            content={[
                ['battery level', `${batteryInfo.level * 100}%`],
                ['charging', stringifyBoolean(batteryInfo.isCharging)],
                ['charging time', batteryInfo.chargingTime === Infinity
                    ? '0'
                    : getReadableTime(batteryInfo.chargingTime) || '0'],
                ['discharging time', batteryInfo.dischargingTime === Infinity
                    ? 'infinity'
                    : getReadableTime(batteryInfo.dischargingTime)],
            ]}
        />
    );
};
