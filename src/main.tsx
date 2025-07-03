import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';

import { GeneralError } from '@/components/Error';
import { AlertProvider, RouterProvider, SettingsProvider } from '@/providers';
import { App } from '@/App';

import './index.css';


const domNode = document.getElementById('root')!;
const root = createRoot(domNode);

root.render(
    <StrictMode>
        <ErrorBoundary FallbackComponent={GeneralError}>
            <RouterProvider>
                <SettingsProvider>
                    <AlertProvider>
                        <App />
                    </AlertProvider>
                </SettingsProvider>
            </RouterProvider>
        </ErrorBoundary>
    </StrictMode>
);
