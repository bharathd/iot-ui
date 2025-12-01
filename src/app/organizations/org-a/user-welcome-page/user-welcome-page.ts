import { Component } from '@angular/core';
import { AppConstant } from '../../../app.contstant';
import { MaterialComponentsModule } from '../../../app-angular-material.module';
import { Footer } from '../footer/footer';
import { RouterLink } from '@angular/router';
import { CommonService } from '../../../service/common-service';
import { OrganizationDetails } from '../models/user';

@Component({
  selector: 'app-user-welcome-page',
  imports: [MaterialComponentsModule, Footer, RouterLink],
  templateUrl: './user-welcome-page.html',
  styleUrl: './user-welcome-page.scss',
})
export class UserWelcomePage {
  organizationDetails = AppConstant.ORGA;
  constructor(private commonService: CommonService){}

  getOrganizationDetails() {
    this.commonService.getOrganizationDeatails<OrganizationDetails>().subscribe({
      next: response => {
        if (response && Object.keys(response).length > 0) {
          this.organizationDetails = response;
        } else {
          this.organizationDetails = AppConstant.ORGA;
        }
      },
      error: () => {
        this.organizationDetails = AppConstant.ORGA;
      }
    })
    
  }
}
