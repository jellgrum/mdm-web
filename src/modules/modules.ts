import { About } from './About';
import { Device } from './Device';


export const modules = [{
    path: '/',
    id: 'about',
    name: 'About the app',
    render: About,
    isExact: true,
}, {
    path: '/device',
    id: 'device',
    name: 'Device',
    render: Device,
    isExact: true,
}];
