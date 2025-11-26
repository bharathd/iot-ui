import { Component } from '@angular/core';
import { Footer } from '../../../organizations/org-a/footer/footer';
import { MaterialComponentsModule } from '../../../app-angular-material.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  imports: [Footer, MaterialComponentsModule, CommonModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss',
})
export class AdminLogin {
  loginForm!: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

   hasError(controlName: string, errorName: string) {
    return this.loginForm.get(controlName)?.hasError(errorName);
  }

  submitForm() {
    if (this.loginForm.invalid) return;
    this.router.navigate(['/admin/dashboard']);
  }



}
