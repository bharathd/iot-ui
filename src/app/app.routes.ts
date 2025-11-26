import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./organizations/org-a/org-a-module').then(m => m.OrgAModule),
  },
];
