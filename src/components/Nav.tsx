import { JSX, HTMLAttributes, useState, useEffect } from 'react';
import {
    IconChevronDown,
    IconInfoCircle,
    IconListDetails,
} from '@tabler/icons-react';

import { routes } from '@/routes';
import { useAppStore } from '@/store';
import { ScrollArea } from '@/components/ui';
import { useCheckActiveNav } from '@/hooks';
import { cn, omit } from '@/utils';

import { Button, buttonVariants } from './Button';
import { Link } from './Router';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from './ui';

import type { MasterView } from '@/types';


interface NavLink {
    id: string;
    title: string;
    label?: string;
    href: string;
    icon: JSX.Element | null;
}

interface SideLink extends NavLink {
    sub?: NavLink[];
}

const moduleIcons = {
    masterViewList: <IconListDetails size={18} />,
    about: <IconInfoCircle size={18} />,
};

const links: SideLink[] = routes
    .filter(({ isSidebarVisible }) => isSidebarVisible)
    .map(({ id, path, name }) => ({
        id,
        title: name,
        href: path,
        icon: moduleIcons[id as keyof typeof moduleIcons],
    }));

const getAllLinks = (links: SideLink[], masterViews: MasterView[]) => {
    const allLinks = links.map(link => {
        if (link.id === 'masterViewList') {
            const sub = masterViews.map(({ id, title }) => ({
                id: `${id}`,
                title,
                href: `/${id}`,
                icon: null,
            }));

            return {
                ...link,
                sub: [omit(link, ['icon']) as NavLink, ...sub],
            };
        }

        return link;
    });

    return allLinks;
};

interface NavProps extends HTMLAttributes<HTMLDivElement> {
    isCollapsed: boolean;
    closeNav: () => void;
}

export const Nav = ({
    isCollapsed,
    className,
    closeNav,
}: NavProps) => {
    const { masterViews } = useAppStore();
    const [allLinks, setAllLinks] = useState(() => getAllLinks(links, masterViews));

    useEffect(() => {
        setAllLinks(getAllLinks(links, masterViews));
    }, [masterViews]);

    const renderLink = ({ sub, ...rest }: SideLink) => {
        const key = `${rest.title}-${rest.href}`;
        if (isCollapsed && sub)
            return (
                <NavLinkIconDropdown
                    {...rest}
                    sub={sub}
                    key={key}
                    closeNav={closeNav}
                />
            );

        if (isCollapsed)
            return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />

        if (sub)
            return <NavLinkDropdown {...rest} sub={sub} key={key} closeNav={closeNav} />;

        return <NavLink {...rest} key={key} closeNav={closeNav} />;
    };

    return (
        <ScrollArea
            data-collapsed={isCollapsed}
            className={cn(
                'group border-b bg-background transition-[max-height,height,padding] duration-500 md:border-none',
                className,
            )}
        >
            <TooltipProvider delayDuration={0}>
                <nav className="grid gap-1 group-[[data-collapsed=true]]:justify-center">
                    {allLinks.map(renderLink)}
                </nav>
            </TooltipProvider>
        </ScrollArea>
    );
};

interface NavLinkProps extends SideLink {
    isSubLink?: boolean;
    closeNav: () => void;
}

const NavLink = ({
    title,
    icon,
    label,
    href,
    closeNav,
    isSubLink = false,
}: NavLinkProps) => {
    const { checkActiveNav } = useCheckActiveNav();

    return (
        <Link
            to={href}
            onClick={closeNav}
            className={cn(
                buttonVariants({
                    variant: checkActiveNav(href) ? 'secondary' : 'ghost',
                    size: 'sm',
                }),
                'h-12 justify-start text-wrap rounded-none px-4',
                isSubLink && 'h-10 w-full border-l border-l-slate-500 px-2',
            )}
            aria-current={checkActiveNav(href) ? 'page' : undefined}
        >
            <div className="mr-2">{icon}</div>
            {title}
            {label && (
                <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
                    {label}
                </div>
            )}
        </Link>
    );
};

const NavLinkDropdown = ({ title, icon, label, sub, closeNav }: NavLinkProps) => {
    const { checkActiveNav } = useCheckActiveNav();

    // Open collapsible by default
    // if one of child element is active
    const isChildActive = sub ? !!sub.find(child => checkActiveNav(child.href)) : false;

    return (
        <Collapsible defaultOpen={isChildActive}>
            <CollapsibleTrigger
                className={cn(
                    buttonVariants({ variant: 'ghost', size: 'sm' }),
                    'group h-12 w-full justify-start rounded-none px-4',
                )}
            >
                <div className="mr-2">{icon}</div>
                {title}
                {label && (
                    <div className="ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground">
                        {label}
                    </div>
                )}
                <span className={cn('ml-auto transition-all group-data-[state="open"]:-rotate-180')}>
                  <IconChevronDown stroke={1} />
                </span>
            </CollapsibleTrigger>
            <CollapsibleContent className="collapsibleDropdown" asChild>
                <ul>
                    {sub!.map(subLink => (
                        <li key={subLink.title} className="my-1 ml-8">
                            <NavLink {...subLink} isSubLink closeNav={closeNav} />
                        </li>
                    ))}
                </ul>
            </CollapsibleContent>
        </Collapsible>
    );
};

const NavLinkIcon = ({ title, icon, label, href }: NavLinkProps) => {
    const { checkActiveNav } = useCheckActiveNav();

    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Link
                    to={href}
                    className={cn(
                        buttonVariants({
                            variant: checkActiveNav(href) ? 'secondary' : 'ghost',
                            size: 'icon',
                        }),
                        'h-12 w-12',
                    )}
                >
                    {icon}
                    <span className="sr-only">{title}</span>
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4 hidden md:block">
                {title}
                {label && <span className="ml-auto text-muted-foreground">{label}</span>}
            </TooltipContent>
        </Tooltip>
    );
};

const NavLinkIconDropdown = ({ title, icon, label, sub }: NavLinkProps) => {
    const { checkActiveNav } = useCheckActiveNav();

    // Open collapsible by default
    // if one of child element is active
    const isChildActive = sub ? !!sub.find((child) => checkActiveNav(child.href)) : false;

    return (
        <DropdownMenu>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={isChildActive ? 'secondary' : 'ghost'}
                            size="icon"
                            className="h-12 w-12"
                        >
                            {icon}
                        </Button>
                    </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                    {title}{' '}
                    {label && <span className="ml-auto text-muted-foreground">{label}</span>}
                    <IconChevronDown
                        size={18}
                        className="-rotate-90 text-muted-foreground"
                    />
                </TooltipContent>
            </Tooltip>
            <DropdownMenuContent side="right" align="start" sideOffset={4}>
                <DropdownMenuLabel>
                    {title} {label ? `(${label})` : ''}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {sub!.map(({ title, icon, label, href }) => (
                    <DropdownMenuItem key={`${title}-${href}`} asChild>
                        <Link
                            to={href}
                            className={checkActiveNav(href) ? 'bg-secondary' : ''}
                        >
                            {icon} <span className="ml-2 max-w-52 text-wrap">{title}</span>
                            {label && <span className="ml-auto text-xs">{label}</span>}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
