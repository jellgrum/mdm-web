import { HTMLAttributes, forwardRef } from 'react';

import { cn } from '@/utils';


interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
    isFadedBelow?: boolean;
    isFixedHeight?: boolean;
}

export const Layout = forwardRef<HTMLDivElement, LayoutProps>(({
    className,
    isFadedBelow = false,
    ...props
}, ref) => (
    <div
        ref={ref}
        className={cn(
            'relative flex h-full w-full flex-col',
            isFadedBelow && 'after:pointer-events-none after:absolute after:bottom-0 ' +
                'after:left-0 after:hidden after:h-32 after:w-full ' +
                'after:bg-[linear-gradient(180deg,_transparent_10%,_hsl(var(--background))_70%)] after:md:block',
            className,
        )}
        {...props}
    />
));
Layout.displayName = 'Layout';

export const LayoutHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
    className,
    ...props
}, ref) => (
    <div
        ref={ref}
        className={cn(
            'flex justify-between h-[var(--header-height)] flex-none items-center gap-4 bg-background py-1 px-6',
            className,
        )}
        {...props}
    />
));
LayoutHeader.displayName = 'LayoutHeader';

interface LayoutBodyProps extends HTMLAttributes<HTMLDivElement> {}

export const LayoutBody = forwardRef<HTMLDivElement, LayoutBodyProps>(({
    className,
    ...props
}, ref) => (
    <div
        ref={ref}
        id="layout-body"
        className={cn('flex-1', className)}
        {...props}
    />
));
LayoutBody.displayName = 'LayoutBody';
