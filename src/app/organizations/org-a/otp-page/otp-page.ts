import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MaterialComponentsModule } from '../../../app-angular-material.module';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';
import { UserService } from '../services/user-service';
import { OrganizationDetails, UserDetails } from '../models/user';
import { AppConstant } from '../../../app.contstant';
import { OtpAutoFocus } from "../../../directives/otp-auto-focus";

@Component({
  selector: 'app-otp-page',
  imports: [MaterialComponentsModule,
    CommonModule, RouterLink, Footer, OtpAutoFocus],
  templateUrl: './otp-page.html',
  styleUrl: './otp-page.scss',
})
export class OtpPage implements OnInit, OnDestroy {
  otpForm!: FormGroup;
  finalOtp = '';
  timeLeft = 90;
  userDetails!: UserDetails;
  interval: any;
  otpExpired = false;
  organizationDetails!: OrganizationDetails;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['userDetails']) {
      this.userDetails = state['userDetails'];
    }
  }
  primaryBgImage = AppConstant.ORGA.config.backgroundImage;

  ngOnInit(): void {
    this.organizationDetails = this.userService.getOrganizationDetailsValue() || AppConstant.ORGA;
    this.primaryBgImage = this.organizationDetails.config.backgroundImage;
    document.documentElement.style.setProperty('--primary-bg', `url(${this.primaryBgImage})`);
    this.createOtpForm();
    this.startTimer();
  }

  createOtpForm () {
    this.otpForm = this.fb.group({
      d1: ['', Validators.required],
      d2: ['', Validators.required],
      d3: ['', Validators.required],
      d4: ['', Validators.required],
      // d5: ['', Validators.required],
      // d6: ['', Validators.required]
    });
    this.otpForm.valueChanges.subscribe(() => {
      this.finalOtp = Object.values(this.otpForm.value).join('');
    });
  }
   hasError(controlName: string, errorName: string) {
    return this.otpForm.get(controlName)?.hasError(errorName);
  }

  startTimer(){
    this.timeLeft = 90;
    this.otpExpired = false;
    this.interval = setInterval(() => {
       if(this.timeLeft > 0){
        this.timeLeft--;
        this.cdr.detectChanges();
      } else {
        this.otpExpired = true;
        clearInterval(this.interval);
      }
      this.cdr.detectChanges();
    },1000);
  }

   verifyOtp() {
    if (this.otpExpired) {
      this.snackBar.open('OTP Expired', 'close', {duration: 3000,});
    }
    const body = { customerId: this.userDetails.customerId, otp: this.finalOtp };
    this.userService.verifyOtp<unknown, { authUrl: string }>(body).subscribe({
       next: (response) => {
        this.snackBar.open('OTP verified successfully', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['dashboard'], { relativeTo: this.route.parent, state: { redirectUrl: response.authUrl } });
      },
      error: err => {
        this.snackBar.open(err.error.errors.message || 'Failed to verify OTP', 'Close', {
          duration: 3000,
        });
      },
    })
  }

  resendOtp() {
    const { customerId, ...body } = this.userDetails;
    this.userService.generateOtp(body).subscribe({
       next: () => {
        this.snackBar.open(`OTP generated successfully ${this.userDetails.mobileNumber}`, 'Close', {
          duration: 3000,
        });
      },
      error: err => {
        this.snackBar.open(err.error.errors.message || 'Failed to generate otp', 'Close', {
          duration: 3000,
        });
      },
    })
    
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
