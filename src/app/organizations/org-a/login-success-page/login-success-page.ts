import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Footer } from "../footer/footer";
import { AppConstant } from '../../../app.contstant';
import { OrganizationDetails } from '../models/user';
import { UserService } from '../services/user-service';
import { Router } from '@angular/router';
import { MaterialComponentsModule } from '../../../app-angular-material.module';

@Component({
  selector: 'app-login-success-page',
  imports: [CommonModule, Footer, MaterialComponentsModule],
  templateUrl: './login-success-page.html',
  styleUrl: './login-success-page.scss',
})
export class LoginSuccessPage implements OnInit {
  organizationDetails!: OrganizationDetails;
  images = [
    'assets/images/hotelkapila-1.png',
    'assets/images/hotelkapila-2.png',
    'assets/images/hotelkapila-2.png'
  ];
  redirectUrl = '';

  constructor(private userService: UserService,
    private router: Router,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['redirectUrl']) {
      this.redirectUrl = state['redirectUrl'];
    }
  }
  primaryBgImage = AppConstant.ORGA.config.backgroundImage;

  ngOnInit(): void {
    this.organizationDetails = this.userService.getOrganizationDetailsValue() || AppConstant.ORGA;
    this.primaryBgImage = this.organizationDetails.config.backgroundImage;
    document.documentElement.style.setProperty('--primary-bg', `url(${this.primaryBgImage})`);
  }
}
