import { useContext } from 'react';

import { SettingsContext } from '@/providers';


export const useSettings = () => useContext(SettingsContext);
