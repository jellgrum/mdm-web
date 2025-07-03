import { useContext } from 'react';

import { RouterContext } from '@/providers';


export const useRouter = () => useContext(RouterContext);
