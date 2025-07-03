import { HTMLAttributes } from 'react';

import { cn } from '@/utils';


export const H1 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
        className={cn(
            'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl font-medium',
            className,
        )}
        {...props}
    />
);

export const H2 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
        className={cn(
            'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 font-medium',
            className,
        )}
        {...props}
    />
);

export const H3 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
        className={cn('scroll-m-20 text-2xl font-semibold tracking-tight font-medium', className)}
        {...props}
    />
);

export const H4 = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h4
        className={cn('scroll-m-20 text-xl font-semibold tracking-tight font-medium', className)}
        {...props}
    />
);
