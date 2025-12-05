import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':organizationId',
    loadChildren: () => import('./organizations/org-a/org-a-module').then(m => m.OrgAModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule),
  },
];
