import { useContext } from 'react';

import { AlertContext } from '@/providers';


export const useAlert = () => useContext(AlertContext);
