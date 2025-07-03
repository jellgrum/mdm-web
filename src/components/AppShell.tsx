import { ReactNode, useEffect } from 'react';

import { useRouter, useSettings } from '@/hooks';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Layout, LayoutBody, LayoutHeader } from '@/components/Layout';
import { H4 } from '@/components/Typography';
import { ScrollArea, useToast } from '@/components/ui';
import { useAppStore } from '@/store';
import { cn } from '@/utils';

import { Sidebar } from './Sidebar';


interface AppShellProps {
    children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
    const { timeoutToReloadNewVersion } = useAppStore();
    const { toast } = useToast();
    const { routeName } = useRouter();
    const { isSidebarCollapsed, setIsSidebarCollapsed } = useSettings();

    useEffect(() => {
        if (typeof timeoutToReloadNewVersion !== 'number') return;

        toast({
            title: 'New version is detected',
            description: `This page will be reloaded automatically in ${timeoutToReloadNewVersion / 1000} sec`,
        });
    }, [timeoutToReloadNewVersion]);

    return (
        <div className="relative h-full overflow-hidden bg-background">
            <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
            <main
                id="content"
                className={cn(
                    'overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 h-full',
                    isSidebarCollapsed ? 'md:ml-14' : 'md:ml-64',
                )}
            >
                <Layout>
                    <LayoutHeader className="hidden md:flex shadow z-10">
                        <H4>{routeName}</H4>
                        <ThemeToggle />
                    </LayoutHeader>

                    <LayoutBody>
                        <ScrollArea className="h-[calc(100vh-64px)] md:h-[calc(100vh-48px)] overflow-hidden">
                            <div className="pt-4 pr-6 pb-6 pl-6 h-full">
                                {children}
                            </div>
                        </ScrollArea>
                    </LayoutBody>
                </Layout>
            </main>
        </div>
    );
};
