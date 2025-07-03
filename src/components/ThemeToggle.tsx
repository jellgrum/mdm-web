import { HTMLAttributes, useEffect } from 'react';
import { IconMoon, IconSun } from '@tabler/icons-react';

import { Button } from '@/components/ui';
import { useSettings } from '@/hooks';


interface ThemeToggleProps extends HTMLAttributes<HTMLDivElement> {}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
    const { theme, setTheme } = useSettings();

    useEffect(() => {
        const themeColor = theme === 'dark' ? '#09090b' : '#fff';
        const metaThemeColor = document.querySelector("meta[name='theme-color']");
        if (metaThemeColor) metaThemeColor.setAttribute('content', themeColor);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
        <Button
            size="icon"
            variant="ghost"
            onClick={toggleTheme}
            className={className}
        >
            {theme === 'light' ? <IconMoon size={20} /> : <IconSun size={20} />}
        </Button>
    );
};
