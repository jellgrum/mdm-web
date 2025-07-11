import { ReactElement } from 'react';
import { match } from 'node-match-path';

import { useRouter } from '@/hooks';
import { NotFound } from '@/components/Error';


interface SwitchProps {
    children: ReactElement[];
}

export const Switch = ({ children }: SwitchProps) => {
    const { pathname } = useRouter();

    const path = pathname === '' ? '/' : pathname;
    const route = children.find(({ props }) => {
        if (props.path === path) return true;
        if (path.startsWith(props.path)) {
            const rest = path.replace(props.path, '');
            return rest.length === 0 || rest.startsWith('/');
        }
        return match(props.path, path).matches;
    });

    if (!route) return <NotFound />;

    const Component = route.props.render;
    return <Component {...match(route?.props.path, path).params} />;
};
