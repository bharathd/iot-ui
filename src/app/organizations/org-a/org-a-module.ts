import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgARoutingModule } from './org-a-routing-module';
import { MaterialComponentsModule } from '../../app-angular-material.module';
import { OtpAutoFocus } from '../../directives/otp-auto-focus';


@NgModule({
  imports: [
    CommonModule,
    OrgARoutingModule,
    MaterialComponentsModule,
    OtpAutoFocus
  ]
})
export class OrgAModule { }
