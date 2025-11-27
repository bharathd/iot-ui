import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserWelcomePage } from './user-welcome-page/user-welcome-page';
import { LoginPage } from './login-page/login-page';
import { OtpPage } from './otp-page/otp-page';
import { LoginSuccessPage } from './login-success-page/login-success-page';

const routes: Routes = [
  {
    path: '',
    component: UserWelcomePage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'verify-otp',
    component: OtpPage
  },
  {
    path: 'dashboard',
    component: LoginSuccessPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgARoutingModule { }
