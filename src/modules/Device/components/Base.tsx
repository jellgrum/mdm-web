import { TablerIcon } from '@tabler/icons-react';

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from '@/components/ui';
import { List } from '@/components/Typography';


interface DeviceBaseProps {
    Icon: TablerIcon;
    title: string;
    content: string[][];
}

export const stringifyBoolean = (state: boolean) => state ? '✓' : '✗';

export const Base = ({
    Icon,
    title,
    content,
}: DeviceBaseProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Icon size={20} className="mr-1" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <List className="list-none m-0">
                    {content.map(([key, value]) => (
                        <li key={key} className="flex justify-between">
                            <span className="mr-1">{key}:</span>
                            <span>{value}</span>
                        </li>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};
