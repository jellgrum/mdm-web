import { HTMLAttributes } from 'react';

import { cn } from '@/utils';


export const List = ({ className, ...props }: HTMLAttributes<HTMLUListElement>) => (
    <ul
        className={cn('mb-6 ml-3 list-disc list-inside [&>li]:mt-2', className)}
        {...props}
    />
);
