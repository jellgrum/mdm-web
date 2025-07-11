import {
    ScrollArea,
    Separator,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui';
import { H3 } from '@/components/Typography';
import { cn } from '@/utils';

import { AppDescription, UsedTechs } from './components';


enum Tab {
    AppDescription = 'app-description',
    UsedTechs = 'used-techs',
}

const classNameScrollHeight = 'md:h-[calc(100vh-88px)]';

export const About = () => (
    <>
        <Tabs orientation="vertical" defaultValue={Tab.AppDescription} className="block md:hidden">
            <div className="w-full pb-2">
                <TabsList>
                    <TabsTrigger value={Tab.AppDescription}>App description</TabsTrigger>
                    <TabsTrigger value={Tab.UsedTechs}>Used technologies</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value={Tab.UsedTechs} className="space-y-4">
                <UsedTechs />
            </TabsContent>
            <TabsContent value={Tab.AppDescription} className="space-y-4">
                <AppDescription />
            </TabsContent>
        </Tabs>

        <div className="hidden md:flex gap-4">
            <ScrollArea className={cn('w-1/2', classNameScrollHeight)}>
                <H3 className="mb-4">App description</H3>
                <AppDescription />
            </ScrollArea>

            <Separator orientation="vertical" className={classNameScrollHeight} />

            <ScrollArea className={cn('w-1/2', classNameScrollHeight)}>
                <H3 className="mb-4">Used technologies</H3>
                <UsedTechs />
            </ScrollArea>
        </div>
    </>
);
