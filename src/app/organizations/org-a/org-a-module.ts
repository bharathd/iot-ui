import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgARoutingModule } from './org-a-routing-module';
import { MaterialComponentsModule } from '../../app-angular-material.module';


@NgModule({
  imports: [
    CommonModule,
    OrgARoutingModule,
     MaterialComponentsModule,
  ]
})
export class OrgAModule { }
