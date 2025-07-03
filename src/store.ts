import { create } from 'zustand';

import { HttpTransport } from '@/api';
import { env } from '@/constants';


interface AppStore {
    timeoutToReloadNewVersion: number | null;

    startVersionChecking: () => void;
}

export const useAppStore = create<AppStore>(set => ({
    timeoutToReloadNewVersion: null,

    startVersionChecking: () => {
        const httpTransport = new HttpTransport({ apiRoot: window.location.origin });
        const timeoutVersionDetecting = 60000;

        const intervalId = setInterval(async () => {
            try {
                const response = await httpTransport.get(`${env.basePath}/build_date.json`, {});
                const { buildDate } = await response.json();

                if (env.buildDate === buildDate) return;

                const timeoutToReloadNewVersion = 5000;
                set({ timeoutToReloadNewVersion });

                setTimeout(() => {
                    clearInterval(intervalId);
                    window.location.reload();
                }, timeoutToReloadNewVersion);
            } catch (error) {
                console.log(error);
            }
        }, timeoutVersionDetecting);
    },
}));
