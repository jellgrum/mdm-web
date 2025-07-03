interface RouteProps {
    path: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: any;
    isExact: boolean;
}

export const Route = ({ render: Component }: RouteProps) => <Component />;
