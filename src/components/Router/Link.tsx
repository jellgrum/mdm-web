import { ForwardedRef, forwardRef, HTMLAttributes, MouseEvent } from 'react';

import { useRouter } from '@/hooks';
import { env } from '@/constants';


interface LinkProps extends Omit<HTMLAttributes<HTMLAnchorElement>, 'href'> {
    to: string;
}

export const Link = forwardRef(({ to, onClick, ...props }: LinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    const { pushHistory } = useRouter();

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation();
        event.preventDefault();

        onClick?.(event);
        pushHistory(to);
    };

    return (
        <a
            href={`${env.basePath}/#${to}`}
            onClick={handleClick}
            ref={ref}
            {...props}
        />
    );
});
