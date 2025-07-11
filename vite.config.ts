import { defineConfig } from 'vite';
import vitePluginReact from '@vitejs/plugin-react';
import vitePluginTsConfigPaths from 'vite-tsconfig-paths';
import vitePluginGenerateFile from 'vite-plugin-generate-file';


const getBuildDate = () => {
    const padZero = (num: number) => num >= 10 ? `${num}` : `0${num}`;

    const d = new Date();
    const date = `${padZero(d.getDate())}-${padZero(d.getMonth() + 1)}-${padZero(d.getFullYear())}`;
    const time = `${padZero(d.getHours())}:${padZero(d.getMinutes())}`;

    return `${time}_${date}`;
};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    const plugins = [
        vitePluginTsConfigPaths(),
        vitePluginReact(),
    ];
    const buildDate = getBuildDate();

    if (command === 'build') {
        plugins.push(
            vitePluginGenerateFile([{
                type: 'json',
                output: 'build_date.json',
                data: { buildDate },
            }]),
        );
    }

    return {
        base: '/mdm-web',
        plugins,
        build: {
            sourcemap: true,
        },
        define: {
            'window.__BUILD_DATE__': JSON.stringify(buildDate),
        },
    };
});
