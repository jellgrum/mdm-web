export const env = Object.freeze({
    basePath: import.meta.env.BASE_URL,
    isProd: import.meta.env.PROD,
    buildDate: window.__BUILD_DATE__,
});

export enum LocalStorageNames {
    ThemeMode = 'ui-theme',
    SidebarCollapsing = 'collapsed-sidebar',
}
