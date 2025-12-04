import { Component } from '@angular/core';
import { MaterialComponentsModule } from '../../../app-angular-material.module';

@Component({
  selector: 'app-admin-header',
  imports: [MaterialComponentsModule],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.scss',
})
export class AdminHeader {

}
