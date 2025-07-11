import { ReactElement } from 'react';
import { match } from 'node-match-path';

import { useRouter } from '@/hooks';
import { NotFound } from '@/components/Error';


interface SwitchProps {
    children: ReactElement[];
}

export const Switch = ({ children }: SwitchProps) => {
    const { pathname } = useRouter();

    const route = children.find(({ props }) => {
        if (props.path.includes('/:'))
            return match(props.path, pathname).matches;
        if (props.path === pathname)
            return true;
        if (pathname.startsWith(props.path)) {
            const rest = pathname.replace(props.path, '');
            return rest.length === 0 || rest.startsWith('/');
        }
        return false;
    });

    if (!route) return <NotFound />;

    const Component = route.props.render;
    return <Component {...match(route.props.path, pathname).params} />;
};
