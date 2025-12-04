import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Footer } from "../footer/footer";
import { AppConstant } from '../../../app.contstant';

@Component({
  selector: 'app-login-success-page',
  imports: [CommonModule, Footer],
  templateUrl: './login-success-page.html',
  styleUrl: './login-success-page.scss',
})
export class LoginSuccessPage {
  organizationDetails = AppConstant.ORGA;
   images = [
    'assets/images/hotelkapila-1.png',
    'assets/images/hotelkapila-2.png',
    'assets/images/hotelkapila-2.png'
  ];

}
