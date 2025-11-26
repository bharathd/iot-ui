import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserWelcomePage } from './user-welcome-page/user-welcome-page';

const routes: Routes = [
  {
    path: '',
    component: UserWelcomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgARoutingModule { }
