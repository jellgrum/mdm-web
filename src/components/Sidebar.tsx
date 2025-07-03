import {
    useEffect,
    useState,
    HTMLAttributes,
    Dispatch,
    SetStateAction,
} from 'react';
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react';

import { ThemeToggle } from '@/components/ThemeToggle';
import {
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
} from '@/components/ui';
import { cn } from '@/utils';

import { Layout, LayoutHeader } from './Layout';
import { Button } from './Button';
import { Nav } from './Nav';

import logo from '@/assets/logo.svg';


interface SidebarProps extends HTMLAttributes<HTMLElement> {
    isCollapsed: boolean;
    setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({
    className,
    isCollapsed,
    setIsCollapsed,
}: SidebarProps) => {
    const [isNavOpened, setIsNavOpened] = useState(false);

    // Make body not scrollable when navBar is opened
    useEffect(() => {
        if (isNavOpened) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isNavOpened]);

    const hideNav = () => setIsNavOpened(false);

    const toggleNavVisibility = () => setIsNavOpened((prev) => !prev);

    const toggleCollapsing = () => setIsCollapsed((prev: boolean) => !prev);

    return (
        <aside
            className={cn(
                `fixed left-0 right-0 top-0 z-50 w-full border-r-0 border-r-muted md:border-r-2 transition-[width]
                md:bottom-0 md:right-auto md:h-svh`,
                isCollapsed ? 'md:w-14' : 'md:w-64',
                className,
            )}
        >
            <div
                onClick={hideNav}
                className={cn(
                    'absolute inset-0 transition-[opacity] delay-100 duration-700 w-full bg-black md:hidden',
                    isNavOpened ? 'h-svh opacity-50' : 'h-0 opacity-0',
                )}
            />

            <Layout>
                <LayoutHeader className="sticky top-0 px-4 py-3 shadow md:px-4 z-10">
                    <TooltipProvider delayDuration={0}>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <a
                                    className={cn('flex items-center', !isCollapsed && 'gap-1')}
                                    href="https://jellgrum.dev"
                                    target="_blank"
                                >
                                    <img src={logo} className={cn('dark:invert w-5 min-w-5', isCollapsed && 'py-0.5')} alt="" />
                                    <div className={cn(
                                        'justify-end truncate items-center gap-2',
                                        isCollapsed ? 'hidden' : 'flex',
                                    )}>
                                        <span className="font-medium">
                                            ellgrum.Dev{'<Unity>'}
                                        </span>
                                    </div>
                                </a>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="flex items-center gap-4 hidden md:block">
                                Developer page
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <div className="flex gap-2 items-center">
                        <ThemeToggle className="flex md:hidden" />

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            aria-label="Toggle Navigation"
                            aria-controls="sidebar-menu"
                            aria-expanded={isNavOpened}
                            onClick={toggleNavVisibility}
                        >
                            {isNavOpened ? <IconX /> : <IconMenu2 />}
                        </Button>
                    </div>
                </LayoutHeader>

                <Nav
                    id="sidebar-menu"
                    className={cn(
                        'h-full flex-1',
                        isNavOpened
                            ? 'max-h-[calc(100vh-64px)] md:max-h-[calc(100vh-48px)] h-[calc(100vh-64px)] md:h-[calc(100vh-48px)]'
                            : 'max-h-0 h-0 pb-0 mt-0 md:max-h-[calc(100vh-48px)] md:h-[calc(100vh-48px)] md:pb-1 md:mt-1',
                    )}
                    closeNav={hideNav}
                    isCollapsed={isCollapsed}
                />

                <Button
                    onClick={toggleCollapsing}
                    size="icon"
                    variant="outline"
                    className="absolute -right-5 top-1/2 hidden rounded-full md:inline-flex"
                >
                    <IconChevronsLeft
                        stroke={1.5}
                        className={cn('h-5 w-5', isCollapsed && 'rotate-180')}
                    />
                </Button>
            </Layout>
        </aside>
    );
};
