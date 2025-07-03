import { useEffect } from 'react';

import { AppShell } from '@/components/AppShell';
import { Route, Switch } from '@/components/Router';
import { Confirm } from '@/components/Confirm';
import { Toaster } from '@/components/ui/toaster';
import { useAppStore } from '@/store';
import { modules } from '@/modules';
import { env } from '@/constants';


export const App = () => {
    const { startVersionChecking } = useAppStore();

    useEffect(() => {
        if (env.isProd) startVersionChecking();
    }, []);

    return (
        <AppShell>
            <Switch>
                {modules.map(route => <Route key={route.path} {...route} />)}
            </Switch>
            <Toaster />
            <Confirm />
        </AppShell>
    );
};
