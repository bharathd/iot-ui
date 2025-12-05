import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Footer } from "../footer/footer";
import { AppConstant } from '../../../app.contstant';
import { OrganizationDetails } from '../models/user';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-login-success-page',
  imports: [CommonModule, Footer],
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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.organizationDetails = this.userService.getOrganizationDetailsValue() || AppConstant.ORGA;
  }

}
