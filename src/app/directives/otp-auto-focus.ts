import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, QueryList } from '@angular/core';
import { FormGroup, NgControl } from '@angular/forms';

@Directive({
  selector: '[appOtpAutoFocus]',
})
export class OtpAutoFocus {
  constructor(
    private el: ElementRef,
    private control: NgControl
  ) {}

  // Allow only numbers
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const allowed = ['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'];

    if (!/[0-9]/.test(event.key) && !allowed.includes(event.key)) {
      event.preventDefault();
    }
  }

  // Auto move next
  @HostListener('input', ['$event'])
  onInput(event: any) {
    const input = event.target;
    const value = input.value;

    const parent = input.parentElement;
    const inputs = parent.querySelectorAll('input[appOtpAutoFocus]');

    const index = Number(input.dataset.otp);

    // Paste handling
    if (value.length > 1) {
      this.applyPaste(value, inputs);
      return;
    }

    // Move NEXT
    if (value && inputs[index + 1]) {
      inputs[index + 1].focus();
    }

    this.updateOtp(inputs);
  }

  // Backspace handling
  @HostListener('keydown.backspace', ['$event'])
  onBackspace(event: any) {
    const input = event.target;
    const parent = input.parentElement;
    const inputs = parent.querySelectorAll('input[appOtpAutoFocus]');
    const index = Number(input.dataset.otp);

    if (!input.value && inputs[index - 1]) {
      setTimeout(() => inputs[index - 1].focus(), 10);
    }
  }

  // Paste entire OTP
  private applyPaste(value: string, inputs: any) {
    const digits = value.replace(/\D/g, '').slice(0, inputs.length).split('');

    digits.forEach((d, i) => {
      inputs[i].value = d;
      const controlName = inputs[i].getAttribute('formControlName');
      this.control.control?.root?.get(controlName)?.setValue(d);
    });

    inputs[digits.length - 1].focus();
    this.updateOtp(inputs);
  }

  // Emit OTP
  private updateOtp(inputs: any) {
    const rootForm = this.control.control?.root;
    if (!rootForm) return;

    let otp = '';

    inputs.forEach((input: any) => {
      const controlName = input.getAttribute('formControlName');
      otp += rootForm.get(controlName)?.value || '';
    });

    // Store combined OTP on form
    (rootForm as any).value.finalOtp = otp;
  }
}
