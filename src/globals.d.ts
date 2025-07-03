interface NavigatorBatteryStatus {
    getBattery(): Promise<BatteryManager>;
    BatteryManager: BatteryManager;
    BatteryManagerEvent: BatteryManagerEvent;
}

interface BatteryManager extends BatteryManagerEventTarget {
    readonly charging: boolean;
    readonly chargingTime: number;
    readonly dischargingTime: number;
    readonly level: number;
}

type BatteryManagerEvent = Event & { target: BatteryManager };

interface BatteryManagerEventTargetEventMap {
    chargingchange: BatteryManagerEvent;
    chargingtimechange: BatteryManagerEvent;
    dischargingtimechange: BatteryManagerEvent;
    levelchange: BatteryManagerEvent;
}

interface BatteryManagerEventTarget extends EventTarget {
    onchargingchange: (this: BatteryManager, event: BatteryManagerEvent) => void;
    onlevelchange: (this: BatteryManager, event: BatteryManagerEvent) => void;
    onchargingtimechange: (this: BatteryManager, event: BatteryManagerEvent) => void;
    ondischargingtimechange: (this: BatteryManager, event: BatteryManagerEvent) => void;
    addEventListener<K extends keyof BatteryManagerEventTargetEventMap>(
        type: K,
        listener: (this: BatteryManager, event: BatteryManagerEventTargetEventMap[K]) => void,
        useCapture?: boolean,
    ): void;
}

interface NavigatorBluetooth {
    readonly bluetooth: {
        getAvailability(): Promise<boolean>;
    };
}

interface NavigatorDeviceMemory {
    readonly deviceMemory: number;
}

interface NavigatorNetworkInformation {
    connection: NetworkInformation;
}

interface NetworkInformation extends NetworkInformationEventTarget {
    readonly type?: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown';
    readonly downlink: number;
    readonly downlinkMax?: number;
    readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
    readonly rtt: number;
    readonly saveData: boolean;
}

type NetworkInformationEvent = Event & { target: BatteryManager };

interface NetworkInformationEventTargetEventMap {
    change: NetworkInformationEvent;
}

interface NetworkInformationEventTarget extends EventTarget {
    onchange: (this: NetworkInformation, event: NetworkInformationEvent) => void;
    addEventListener<K extends keyof NetworkInformationEventTargetEventMap>(
        type: K,
        listener: (this: NetworkInformation, event: NetworkInformationEventTargetEventMap[K]) => void,
        useCapture?: boolean,
    ): void;
}

declare global {
    interface Window {
        __BUILD_DATE__?: string;
    }

    interface Screen {
        isExtended: boolean;
    }

    interface Navigator extends NavigatorBatteryStatus {}
    interface Navigator extends NavigatorBluetooth {}
    interface Navigator extends NavigatorDeviceMemory {}
    interface Navigator extends NavigatorNetworkInformation {}
}

export {};
