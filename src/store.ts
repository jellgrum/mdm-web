import { create } from 'zustand';

import { HttpTransport } from '@/api';
import { env } from '@/constants';

import type { MasterView, DetailView } from '@/types';


interface AppStore {
    timeoutToReloadNewVersion: number | null;
    startVersionChecking: () => void;

    masterViews: MasterView[];
    detailViews: DetailView[];

    createMasterView: (masterView: MasterView) => void;
    updateMasterView: (masterView: MasterView) => void;
    deleteMasterView: (id: number) => void;

    createDetailView: (detailView: DetailView) => void;
    updateDetailView: (detailView: DetailView) => void;
    deleteDetailView: (id: number) => void;
}

export const useAppStore = create<AppStore>(set => ({
    timeoutToReloadNewVersion: null,
    startVersionChecking: () => {
        if (!env.isProd) return;

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

    // todo: remove mock data
    masterViews: [{
        id: 1,
        title: 'Example',
        created: new Date(),
        lastChange: new Date(),
        detailViewCount: 0,
        fields: [],
        shouldHideEmptyFields: false,
    }],
    detailViews: [],

    createMasterView: masterView => {
        set(state => ({
            masterViews: state.masterViews.concat(masterView),
        }));
    },
    updateMasterView: masterView => {
        set(state => ({
            masterViews: state.masterViews.concat(masterView),
        }));
    },
    deleteMasterView: id => {
        set(state => ({
            masterViews: state.masterViews.filter(masterView => masterView.id !== id),
        }));
    },

    createDetailView: detailView => {
        set(state => ({
            detailViews: state.detailViews.concat(detailView),
        }));
    },
    updateDetailView: detailView => {
        set(state => ({
            detailViews: state.detailViews.concat(detailView),
        }));
    },
    deleteDetailView: id => {
        set(state => ({
            detailViews: state.detailViews.filter(detailView => detailView.id !== id),
        }));
    },
}));
