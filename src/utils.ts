import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClassDictionary = Record<string, any>;
type ClassArray = ClassValue[];
type ClassValue = ClassArray | ClassDictionary | string | number | bigint | null | boolean | undefined;

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const throttle = (func: (...args: unknown[]) => void, ms: number) => {
    let timeoutId: NodeJS.Timeout | null = null;
    return (...args: unknown[]) => {
        if (!timeoutId) {
            timeoutId = setTimeout(() => {
                func(...args);
                timeoutId = null;
            }, ms);
        }
    };
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getTimeParts = (timeSeconds: number) => {
    const oneHourSeconds = 3600;
    const oneMinuteSeconds = 60;

    const hours = Math.floor(timeSeconds / oneHourSeconds);
    const minutes = Math.floor((timeSeconds - (hours * oneHourSeconds)) / oneMinuteSeconds);
    const seconds = timeSeconds - (hours * oneHourSeconds) - (minutes * oneMinuteSeconds);

    return { hours, minutes, seconds };
};

export const getFormattedTime = (timeSeconds: number) => {
    const padZero = (num: number) => num < 10 ? `0${num}` : num;

    const { hours, minutes, seconds } = getTimeParts(timeSeconds);
    return [padZero(hours), padZero(minutes), padZero(seconds)].join(':');
};

export const getReadableTime = (timeSeconds: number) => {
    const { hours, minutes, seconds } = getTimeParts(timeSeconds);
    return [
        hours ? `${hours}h` : '',
        minutes ? `${minutes}m` : '',
        seconds ? `${seconds}s` : '',
    ].filter(Boolean).join(' ');
};

export const getReadableDate = (date: Date): string => {
    return new Intl.DateTimeFormat(navigator.language, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }).format(date);
};

export const getReadableBytes = (bytes: number, decimals = 1) => {
    const thresh = 1024;

    if (Math.abs(bytes) < thresh) {
        return `${bytes} B`;
    }

    const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'];
    let u = -1;
    const r = 10 ** decimals;

    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return `${bytes.toFixed(decimals)} ${units[u]}`;
};

export const getHorizontalScrollAreaContentWidth = (isSidebarCollapsed: boolean) => cn(
    'w-[calc(100vw-48px)]',
    isSidebarCollapsed ? 'md:w-[calc(100vw-104px)]' : 'md:w-[calc(100vw-304px)]',
);

export const getUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
