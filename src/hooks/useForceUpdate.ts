import { useReducer } from 'react';


export const useForceUpdate = () => {
    const [, forceUpdate] = useReducer(num => num + 1, 0, () => 0);
    return forceUpdate;
};
