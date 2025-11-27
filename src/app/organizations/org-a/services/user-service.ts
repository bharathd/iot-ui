import { Injectable } from '@angular/core';
import { ApiService } from '../../../service/api-service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  sendOtp<B, R>(B: B) {
    return this.apiService.httpPost<B, R>('user/send-otp', B);
  }

  
}
