import { useEffect } from 'react';

import { AppShell } from '@/components/AppShell';
import { Route, Switch } from '@/components/Router';
import { Confirm } from '@/components/Confirm';
import { Toaster } from '@/components/ui/toaster';
import { useAppStore } from '@/store';
import { routes } from '@/routes';


export const App = () => {
    const { startVersionChecking } = useAppStore();

    useEffect(startVersionChecking, []);

    return (
        <AppShell>
            <Switch>
                {routes.map(route => <Route key={route.path} {...route} />)}
            </Switch>
            <Toaster />
            <Confirm />
        </AppShell>
    );
};
