import { Routes } from '@angular/router';
import { ApplicationDetailPage } from './pages/application-detail/application-detail.page';
import { ApplicationsListPage } from './pages/applications-list/applications-list.page';

export const routes: Routes = [
  {
    path: '',
    component: ApplicationsListPage,
  },
  {
    path: 'applications/:id',
    component: ApplicationDetailPage,
  },
];
