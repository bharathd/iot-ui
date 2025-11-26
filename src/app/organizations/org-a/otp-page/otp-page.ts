import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { MaterialComponentsModule } from '../../../app-angular-material.module';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';

@Component({
  selector: 'app-otp-page',
  imports: [MaterialComponentsModule,
    CommonModule, RouterLink, Footer],
  templateUrl: './otp-page.html',
  styleUrl: './otp-page.scss',
})
export class OtpPage {
  otpForm!: FormGroup;
  finalOtp: string = "";
  storedOtp: string | null = '';
  storedNumber: string | null = '';
  timeLeft = 90;
  interval: any;
  otpExpired = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;
  ngOnInit(): void {
    this.storedOtp = localStorage.getItem('otp');
    this.storedNumber = localStorage.getItem('contactNumber')
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
    localStorage.setItem("otp", newOtp);
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

}
