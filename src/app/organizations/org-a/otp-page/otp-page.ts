import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { MaterialComponentsModule } from '../../../app-angular-material.module';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';
import { UserService } from '../services/user-service';
import { UserDetails } from '../models/user';

@Component({
  selector: 'app-otp-page',
  imports: [MaterialComponentsModule,
    CommonModule, RouterLink, Footer],
  templateUrl: './otp-page.html',
  styleUrl: './otp-page.scss',
})
export class OtpPage {
  otpForm!: FormGroup;
  finalOtp = '';
  storedOtp = '';
  timeLeft = 90;
  userDetails!: UserDetails;
  interval: any;
  otpExpired = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['userDetails']) {
      this.userDetails = state['userDetails'];
      console.log(this.userDetails);
      this.storedOtp = state['userDetails'].otp;
    }
  }

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  ngOnInit(): void {
    this.createOtpForm();
    this.startTimer();
  }

  createOtpForm () {
    this.otpForm = this.fb.group({
      d1: ['', Validators.required],
      d2: ['', Validators.required],
      d3: ['', Validators.required],
      d4: ['', Validators.required],
      d5: ['', Validators.required],
      d6: ['', Validators.required]
    });
  }
   hasError(controlName: string, errorName: string) {
    return this.otpForm.get(controlName)?.hasError(errorName);
  }

  restrictToNumber(event: KeyboardEvent) {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

   moveNext(event: any, index: number) {
    if (event.target.value && index < 5) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
    this.collectOtp();
  }

  movePrev(event: any, index: number) {
    if (!event.target.value && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

   collectOtp() {
    this.finalOtp = Object.values(this.otpForm.value).join('');
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
    this.collectOtp();
    if (this.otpExpired) {
      this.snackBar.open('OTP Expired', 'close', {duration: 3000,});
    }
    if (this.finalOtp === this.storedOtp) {
      this.snackBar.open('OTP Verified Successfully!', 'close', {duration: 3000,});
      this.router.navigate(['/dashboard'])
    } else {
      this.snackBar.open('Invalid OTP', 'close', {duration: 3000,});
    }
  }

  resendOtp() {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    this.storedOtp = newOtp;
    const body = {...this.userDetails, otp: newOtp}
    this.userService.sendOtp(body).subscribe({
       next: () => {
        this.snackBar.open('Otp generated successfully', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/admin/staff']);
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
