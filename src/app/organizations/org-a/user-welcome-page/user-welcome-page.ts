import { Component } from '@angular/core';
import { AppConstant } from '../../../app.contstant';
import { MaterialComponentsModule } from '../../../app-angular-material.module';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-welcome-page',
  imports: [MaterialComponentsModule, Footer, RouterLink],
  templateUrl: './user-welcome-page.html',
  styleUrl: './user-welcome-page.scss',
})
export class UserWelcomePage {
  organizationDetails = AppConstant.ORGA;

}
