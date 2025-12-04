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
  primaryBgImage = AppConstant.ORGA.backgroundImage;
  secondBgImage = AppConstant.ORGA.secondBgImage;
  primaryBg = AppConstant.ORGA.backgroundImage;
  secondBg = AppConstant.ORGA.secondBgImage;
  mobileBg = AppConstant.ORGA.mobileBg;
  mobileSecondBg = AppConstant.ORGA.mobileSecondBg;
  organizationDetails = AppConstant.ORGA;


  constructor( private commonService: CommonService) {}

  ngOnInit() {
    this.getOrganizationDetails();
    document.documentElement.style.setProperty('--primary-color', this.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', this.secondaryColor);
    document.documentElement.style.setProperty('--primary-bg', `url(${this.primaryBgImage})`);
    document.documentElement.style.setProperty('--second-bg', `url(${this.secondBgImage})`);
    document.documentElement.style.setProperty('--mobile-bg', `url(${this.organizationDetails.mobileBg})`);
    document.documentElement.style.setProperty('--mobile-second-bg', `url(${this.organizationDetails.mobileSecondBg})`);

  }

  getOrganizationDetails() {
    this.commonService.getOrganizationDeatails<OrganizationDetails>().subscribe({
      next: response => {
        if (response && Object.keys(response).length > 0) {
          this.organizationDetails = response;
          this.primaryColor = this.organizationDetails.primaryColor;
          this.secondaryColor = this.organizationDetails.secondaryColor;
          this.primaryBgImage = this.organizationDetails.backgroundImage;
          this.secondBgImage = this.organizationDetails.secondBgImage;
          this.mobileBg = this.organizationDetails.mobileBg;
          this.mobileSecondBg = this.organizationDetails.mobileSecondBg;
        } else {
          this.organizationDetails = AppConstant.ORGA;
          this.primaryColor = AppConstant.ORGA.primaryColor;
          this.secondaryColor = AppConstant.ORGA.secondaryColor;
          this.primaryBgImage = AppConstant.ORGA.backgroundImage;
          this.secondBgImage = AppConstant.ORGA.secondBgImage;
          this.mobileBg = AppConstant.ORGA.mobileBg;
          this.mobileSecondBg = AppConstant.ORGA.mobileSecondBg;
        }
      },
      error: () => {
        this.organizationDetails = AppConstant.ORGA;
      }
    })
  }
}
