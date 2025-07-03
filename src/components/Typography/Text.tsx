import { HTMLAttributes } from 'react';

import { cn } from '@/utils';


export const Paragraph = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p
        className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
        {...props}
    />
);

export const Blockquote = ({ className, ...props }: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
        className={cn('mt-6 border-l-2 pl-6 italic', className)}
        {...props}
    />
);

export const InlineCode = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
    <code
        className={cn(
            'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
            className,
        )}
        {...props}
    />
);

export const Lead = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p
        className={cn('text-xl text-muted-foreground', className)}
        {...props}
    />
);

export const Large = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn('text-lg font-semibold', className)}
        {...props}
    />
);

export const Small = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
    <small
        className={cn('text-sm font-medium leading-none', className)}
        {...props}
    />
);

export const Muted = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
    />
);

interface AnchorProps extends HTMLAttributes<HTMLAnchorElement> {
    href: string;
}

export const Anchor = ({ className, ...props }: AnchorProps) => (
    <a
        className={cn('text-sm text-blue-600 dark:text-blue-500', className)}
        rel="nofollow noreferrer"
        target="_blank"
        {...props}
    />
);
