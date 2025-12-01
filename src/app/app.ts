import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppConstant } from './app.contstant';
import { CommonService } from './service/common-service';
import { OrganizationDetails } from './organizations/org-a/models/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly title = signal('iot-ui');
  primaryColor = AppConstant.ORGA.primaryColor;
  secondaryColor = AppConstant.ORGA.secondaryColor;
  organizationDetails = AppConstant.ORGA;

  constructor( private commonService: CommonService) {}

  ngOnInit() {
    this.getOrganizationDetails();
    document.documentElement.style.setProperty('--primary-color', this.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', this.secondaryColor);
  }

  getOrganizationDetails() {
    this.commonService.getOrganizationDeatails<OrganizationDetails>().subscribe({
      next: response => {
        if (response && Object.keys(response).length > 0) {
          this.organizationDetails = response;
          this.primaryColor = this.organizationDetails.primaryColor;
          this.secondaryColor = this.organizationDetails.secondaryColor;
        } else {
          this.organizationDetails = AppConstant.ORGA;
          this.primaryColor = AppConstant.ORGA.primaryColor;
          this.secondaryColor = AppConstant.ORGA.secondaryColor;
        }
      },
      error: () => {
        this.organizationDetails = AppConstant.ORGA;
      }
    })
  }
}
