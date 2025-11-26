import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLogin } from './components/admin-login/admin-login';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { DeviceIndetail } from './components/device-indetail/device-indetail';

const routes: Routes = [
  {
    path: '',
    component: AdminLogin,
  },
  {
    path: 'dashboard',
    component: AdminDashboard
  },
  {
    path: 'device-details',
    component: DeviceIndetail
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
