import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialComponentsModule } from '../../../app-angular-material.module';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';
import { UserService } from '../services/user-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConstant } from '../../../app.contstant';

@Component({
  selector: 'app-login-page',
  imports: [MaterialComponentsModule, CommonModule, Footer],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage  implements OnInit{
  loginForm!: FormGroup;
  generatedOtp: string = '';
  isLoading = false;
  organizationDetails = AppConstant.ORGA;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
    });
  }

   hasError(controlName: string, errorName: string) {
    return this.loginForm.get(controlName)?.hasError(errorName);
  }

  submitForm() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const body = {...this.loginForm.value}
    
    this.userService.generateOtp(body).subscribe({
       next: () => {
        this.isLoading = false;
        this.snackBar.open('Otp generated successfully', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/verify-otp'], {state: {userDetails: body}});
      },
      error: err => {
        this.isLoading = false;
        this.snackBar.open(err.error.errors.message || 'Failed to generate otp', 'Close', {
          duration: 3000,
        });
      },
    })
    this.router.navigate(['/verify-otp'], {state: {userDetails: body}});
  }
}
