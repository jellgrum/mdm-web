import { useRouter } from './useRouter';


export const useCheckActiveNav = () => {
    const { pathname } = useRouter();

    const checkActiveNav = (nav: string) => {
        const pathArray = pathname.split('/').filter(Boolean);
        return nav === '/' && pathArray.length < 1
            ? true
            : pathArray.includes(nav.replace(/^\//, ''));
    };

    return { checkActiveNav };
};
