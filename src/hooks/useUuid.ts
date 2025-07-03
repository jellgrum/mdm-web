import { useMemo } from "react";


export const useUuid = () => {
    return useMemo(() => '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, char =>
        (+char ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +char / 4).toString(16)
    ), []);
};
