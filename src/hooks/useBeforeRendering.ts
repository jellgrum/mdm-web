import { useMemo } from 'react';


export const useBeforeRendering = (callback: () => void) => {
    useMemo(callback, []);
};
