interface RouteProps {
    path: string;
    id: string;
    name: string;
    render: () => JSX.Element;
    isSidebarVisible: boolean;
}

export const Route = ({ render: Component }: RouteProps) => <Component />;
