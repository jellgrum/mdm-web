import { ReactElement, createContext, useState, useEffect, useCallback } from 'react';

import { env } from '@/constants';
import { routes } from '@/routes';


interface RouterProps {
    children: ReactElement;
}

const { basePath } = env;

const getLocation = (fullUrl: string) => {
    const url = fullUrl.replace(basePath, '');
    const indexSearch = url.indexOf('?');

    const pathname = indexSearch === -1 ? url : url.slice(0, indexSearch);
    const search = indexSearch === -1 ? '' : url.slice(indexSearch);

    const routeName = routes.find(({ path }) => {
        if (path === (pathname || '/')) return true;
        if (pathname.startsWith(path)) {
            const diff = pathname.replace(path, '');
            return diff.length === 0 || diff.startsWith('/');
        }

        return undefined;
    });

    return {
        pathname: pathname === '/' ? '' : pathname,
        search,
        routeName: routeName?.name || '',
    };
};

const getRoute = () => `${window.location.pathname}${window.location.search}`;
const initialLocation = getLocation(getRoute());

export const RouterContext = createContext({
    ...initialLocation,
    pushHistory: (pathname: string, search?: string) => {
        void pathname;
        void search;
    },
});

export const RouterProvider = ({ children }: RouterProps) => {
    const [location, setLocation] = useState(() => getLocation(getRoute()));

    const handleChangeHistory = useCallback(() => {
        const route = getRoute();
        const location = getLocation(route);
        setLocation(location);
    }, []);

    window.addEventListener('popstate', handleChangeHistory);

    const pushHistory = (pathname: string, search = '') => {
        const location = getLocation(`${pathname}${search}`);
        const newLocation = `${basePath}${location.pathname}${location.search}`;

        setLocation(location);
        window.history.pushState(undefined, '', newLocation);
    };

    useEffect(() => {
        if (location.pathname === '/') return;
        if (/\/+$/.test(location.pathname))
            pushHistory(location.pathname.replace(/\/$/, ''));
    }, [location.pathname]);

    const routing = {
        pathname: location.pathname,
        search: location.search,
        routeName: location.routeName,
        pushHistory,
    };

    return (
        <RouterContext.Provider value={routing}>
            {children}
        </RouterContext.Provider>
    );
};
