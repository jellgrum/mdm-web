import { ReactElement, useMemo } from 'react';
import UAParser from 'ua-parser-js';

import { useMatchMedia } from '@/hooks';

import {
    Hardware,
    Client,
    Screen,
    Battery,
    Network,
} from './components';


const userAgentParser = new UAParser();
const device = userAgentParser.getResult();

const cards = [
    () => <Hardware os={device.os} cpu={device.cpu} device={device.device} />,
    () => <Client browser={device.browser} engine={device.engine} />,
    () => <Screen />,
    () => <Battery />,
    () => <Network />,
];

export const Device = () => {
    const columnsCount = useMatchMedia({
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
        '2xl': 4,
    });

    const columns = useMemo(() => {
        const columns: ReactElement[][] = Array(columnsCount).fill(null).map(() => []);
        cards.forEach((Card, i) => {
            const columnIndex = i % columnsCount;
            columns[columnIndex].push(<Card key={i} />);
        });

        return columns;
    }, [columnsCount]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {columns.map((column, i) => (
                <div key={i} className="flex flex-col gap-4">
                    {column}
                </div>
            ))}
        </div>
    );
};
