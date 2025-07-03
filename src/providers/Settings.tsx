import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from 'react';

import { LocalStorageNames } from '@/constants';
import { useLocalStorage } from '@/hooks';
import { throttle } from '@/utils';


type Settings = 'dark' | 'light';

interface SettingsProviderProps {
    children: ReactNode;
}

interface SettingsProviderState {
    theme: Settings;
    setTheme: (theme: Settings) => void;
    isSidebarCollapsed: boolean;
    setIsSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
}

export const SettingsContext = createContext<SettingsProviderState>({
    theme: 'dark',
    setTheme: () => {},
    isSidebarCollapsed: (() => {
        const savedValue = localStorage.getItem(LocalStorageNames.SidebarCollapsing) as string | null;
        if (savedValue === null) return false;
        return savedValue === 'true';
    })(),
    setIsSidebarCollapsed: () => {},
});

export const SettingsProvider = ({ children }: SettingsProviderProps) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useLocalStorage({
        key: LocalStorageNames.SidebarCollapsing,
        defaultValue: false,
    });
    const [theme, updateTheme] = useState<Settings>(
        () => (localStorage.getItem(LocalStorageNames.ThemeMode) as Settings) || 'dark',
    );

    const setTheme = (theme: Settings) => {
        localStorage.setItem(LocalStorageNames.ThemeMode, theme);
        updateTheme(theme);
    };

    useEffect(() => {
        const handleResize = throttle(() => {
            const smallWindow = 768;
            setIsSidebarCollapsed(window.innerWidth < smallWindow ? false : isSidebarCollapsed);
        }, 100);

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};
