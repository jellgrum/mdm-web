import { H1, Muted } from '@/components/Typography';


export const GeneralError = () => (
    <div className="h-svh w-full">
        <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
            <H1>500</H1>
            <span className="font-medium">Something went wrong</span>
            <Muted>Please try again later</Muted>
        </div>
    </div>
);
