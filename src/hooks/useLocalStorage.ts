import {
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react';

import { LocalStorageNames } from '@/constants';


interface LocalStorageProps<T> {
    key: LocalStorageNames;
    defaultValue: T;
}

export const useLocalStorage = <T>({
    key,
    defaultValue,
}: LocalStorageProps<T>): [T, Dispatch<SetStateAction<T>>] => {
    const [value, setValue] = useState<T>(() => {
        const stored = localStorage.getItem(key) as string | null;
        return stored === null ? defaultValue : (JSON.parse(stored) as T);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
};
