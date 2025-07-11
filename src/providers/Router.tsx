import {
    ReactElement,
    createContext,
    useState,
    useCallback,
} from 'react';
import { match } from 'node-match-path';

import { env } from '@/constants';
import { routes } from '@/routes';


interface RouterProps {
    children: ReactElement;
}

const { basePath } = env;

const getLocation = (fullUrl: string) => {
    const url = fullUrl.replace(basePath, '');
    const [, hash = '/'] = url.split('#');

    const routeName = routes.find(({ path }) => {
        if (path.includes('/:'))
            return match(path, hash).matches;
        if (path === hash)
            return true;
        if (hash.startsWith(path)) {
            const rest = hash.replace(path, '');
            return rest.length === 0 || rest.startsWith('/');
        }
    });

    return {
        pathname: hash,
        routeName: routeName?.name || '',
    };
};

const getRoute = () => `${window.location.pathname}${window.location.hash}`;
const initialLocation = getLocation(getRoute());

export const RouterContext = createContext({
    ...initialLocation,
    pushHistory: (pathname: string) => {
        void pathname;
    },
});

export const RouterProvider = ({ children }: RouterProps) => {
    const [location, setLocation] = useState(initialLocation);

    const handleChangeHistory = useCallback(() => {
        const route = getRoute();
        const location = getLocation(route);
        setLocation(location);
    }, []);

    window.addEventListener('hashchange', handleChangeHistory);

    const pushHistory = (pathname: string) => {
        const location = getLocation(`#${pathname}`);
        const newLocation = `${basePath}/#${location.pathname}`;

        setLocation(location);
        window.history.pushState(undefined, '', newLocation);
    };

    const routing = {
        pathname: location.pathname,
        routeName: location.routeName,
        pushHistory,
    };

    return (
        <RouterContext.Provider value={routing}>
            {children}
        </RouterContext.Provider>
    );
};
