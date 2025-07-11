import { MasterViewList } from './MasterViewList';
import { MasterViewForm } from './MasterViewForm';
import { DetailViewList } from './DetailViewList';
import { DetailViewForm } from './DetailViewForm';
import { DetailView } from './DetailView';
import { About } from './About';


export const routes = [{
    path: '/about',
    id: 'about',
    name: 'About the app',
    render: About,
    isSidebarVisible: true,
}, {
    path: '/',
    id: 'masterViewList',
    name: 'Master views',
    render: MasterViewList,
    isSidebarVisible: true,
}, {
    path: '/create',
    id: 'masterViewCreate',
    name: 'Create master view',
    render: MasterViewForm,
    isSidebarVisible: false,
}, {
    path: '/:masterViewId/edit',
    id: 'masterViewEdit',
    name: 'Edit master view',
    render: MasterViewForm,
    isSidebarVisible: false,
}, {
    path: '/:masterViewId',
    id: 'detailViewList',
    name: 'Detail views',
    render: DetailViewList,
    isSidebarVisible: false,
}, {
    path: '/:masterViewId/create',
    id: 'detailViewCreate',
    name: 'Create detail view',
    render: DetailViewForm,
    isSidebarVisible: false,
}, {
    path: '/:masterViewId/:detailViewId',
    id: 'detailView',
    name: 'Detail view',
    render: DetailView,
    isSidebarVisible: false,
}, {
    path: '/:masterViewId/:detailViewId/edit',
    id: 'detailViewEdit',
    name: 'Edit detail view',
    render: DetailViewForm,
    isSidebarVisible: false,
}];
