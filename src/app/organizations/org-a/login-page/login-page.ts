import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialComponentsModule } from '../../../app-angular-material.module';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-login-page',
  imports: [MaterialComponentsModule, CommonModule, Footer],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage  implements OnInit{
  loginForm!: FormGroup;
  generatedOtp: string = '';

  constructor(private fb: FormBuilder, private router: Router) {}

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


  generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  submitForm() {
    if (this.loginForm.invalid) return;
    this.generatedOtp = this.generateOtp();
    console.log('OTP Sent:', this.generatedOtp);
    localStorage.setItem('otp', this.generatedOtp);
    localStorage.setItem('contactNumber', this.loginForm.value.contactNumber);
    this.router.navigate(['/verify-otp']);
  }
}
