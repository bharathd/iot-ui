import { Component } from '@angular/core';
import { AppConstant } from '../../../app.contstant';
import { MaterialComponentsModule } from '../../../app-angular-material.module';
import { Footer } from '../footer/footer';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationDetails } from '../models/user';
import { UserService } from '../services/user-service';
import { CommonService } from '../../../service/common-service';

@Component({
  selector: 'app-user-welcome-page',
  imports: [MaterialComponentsModule, Footer],
  templateUrl: './user-welcome-page.html',
  styleUrl: './user-welcome-page.scss',
})
export class UserWelcomePage {
  primaryColor = AppConstant.ORGA.config.primaryColor;
  secondaryColor = AppConstant.ORGA.config.secondaryColor;
  primaryBgImage = AppConstant.ORGA.config.backgroundImage;
  organizationDetails!: OrganizationDetails;
  organizationConfig = AppConstant.ORGA;
  organizationId = '';

  constructor( 
    private userService: UserService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const orgId = this.route.snapshot.parent?.paramMap.get('organizationId');
    this.userService.setOrganizationId(orgId!);
    this.organizationId = orgId ?? '';
    this.getOrganizationDetails();
    document.documentElement.style.setProperty('--primary-color', this.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', this.secondaryColor);
    document.documentElement.style.setProperty('--primary-bg', `url(${this.primaryBgImage})`);
  }

  getOrganizationDetails() {
    this.commonService.getOrganizationDeatails<OrganizationDetails>(this.organizationId).subscribe({
      next: response => {
       
        this.organizationConfig = {
          ...AppConstant.ORGA,
          ...response,
          config: {
            organizationId: response?.config?.organizationId ?? AppConstant.ORGA.config.organizationId,
            logo: response?.config?.logo ?? AppConstant.ORGA.config.logo,
            backgroundImage: response?.config?.backgroundImage ?? AppConstant.ORGA.config.backgroundImage,
            primaryColor: response?.config?.primaryColor ?? AppConstant.ORGA.config.primaryColor,
            secondaryColor: response?.config?.secondaryColor ?? AppConstant.ORGA.config.secondaryColor,
            welcomeTitle: response?.config?.welcomeTitle ?? AppConstant.ORGA.config.welcomeTitle,
            welcomeCaptions: response?.config?.welcomeCaptions ?? AppConstant.ORGA.config.welcomeCaptions,
            websiteUrl: response?.config?.websiteUrl ?? AppConstant.ORGA.config.websiteUrl
          }
        };

        this.organizationDetails = this.organizationConfig;
        this.userService.setOrganizationDetails(this.organizationConfig);
        this.primaryColor = this.organizationConfig.config.primaryColor;
        this.secondaryColor = this.organizationConfig.config.secondaryColor;
        this.primaryBgImage = this.organizationConfig.config.backgroundImage;
        document.documentElement.style.setProperty('--primary-color', this.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', this.secondaryColor);
        document.documentElement.style.setProperty('--primary-bg', `url(${this.primaryBgImage})`);
        },
       error: () => {
        this.organizationConfig = AppConstant.ORGA;
        this.userService.setOrganizationDetails(AppConstant.ORGA);
      }
    })
  }

  movetoLogin() {
    this.router.navigate(['login'], { relativeTo: this.route.parent  });
  }
}
