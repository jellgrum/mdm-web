import { ReactNode, createContext, useState } from 'react';


interface AlertProviderProps {
    children: ReactNode;
}

export interface Alert {
    title: string;
    description: string;
    onCancel: () => void;
    onConfirm: () => void;
}

interface AlertProviderState {
    alertProps: Alert | null;
    showAlert: (alert: Alert) => void;
    hideAlert: () => void;
}

export const AlertContext = createContext<AlertProviderState>({
    alertProps: null,
    showAlert: () => {},
    hideAlert: () => {},
});

export const AlertProvider = ({ children }: AlertProviderProps) => {
    const [alertProps, setAlertProps] = useState<Alert | null>(null);

    const showAlert = (alertProps: Alert) => {
        setAlertProps(alertProps);
    };

    const hideAlert = () => {
        setAlertProps(null);
    };

    const value = {
        alertProps,
        showAlert,
        hideAlert,
    };

    return (
        <AlertContext.Provider value={value}>
            {children}
        </AlertContext.Provider>
    );
};
