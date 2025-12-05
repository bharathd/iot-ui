import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialComponentsModule } from '../../../app-angular-material.module';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';
import { UserService } from '../services/user-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConstant } from '../../../app.contstant';
import { OrganizationDetails } from '../models/user';

@Component({
  selector: 'app-login-page',
  imports: [MaterialComponentsModule, CommonModule, Footer],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage  implements OnInit{
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {}

  loginForm!: FormGroup;
  isLoading = false;
  organizationDetails!: OrganizationDetails;
  primaryBgImage = AppConstant.ORGA.config.backgroundImage;
  fasToken = '';

  ngOnInit() {
    this.organizationDetails = this.userService.getOrganizationDetailsValue() || AppConstant.ORGA;
    this.primaryBgImage = this.organizationDetails.config.backgroundImage;
    document.documentElement.style.setProperty('--primary-bg', `url(${this.primaryBgImage})`);
    this.fasToken = this.route.snapshot.queryParamMap.get('fas') || '';    
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(3)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      // email: ['', Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')],
    });
  }

  onlyDigits(event: KeyboardEvent) {
    const allowed = /[0-9]/;
    if (!allowed.test(event.key)) {
      event.preventDefault();
      return false;
    }
    return true;
  }


   hasError(controlName: string, errorName: string) {
    return this.loginForm.get(controlName)?.hasError(errorName);
  }

  submitForm() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    const body = {...this.loginForm.value, organizationId: this.userService.getOrganizationIdValue(), fasToken: this.fasToken};
    
    this.userService.generateOtp(body).subscribe({
       next: (response) => {
        this.isLoading = false;
        const userData = { ...body, customerId: response['customerId'] };
        this.snackBar.open('Otp generated successfully', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['verify-otp'],{ relativeTo: this.route.parent , state: { userDetails: userData }});
      },
      error: err => {
        this.isLoading = false;
        this.snackBar.open(err.error.errors.message || 'Failed to generate otp', 'Close', {
          duration: 3000,
        });
      },
    })
  }
}
