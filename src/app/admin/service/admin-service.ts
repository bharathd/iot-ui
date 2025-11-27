import { Injectable } from '@angular/core';
import { ApiService } from '../../service/api-service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private apiService: ApiService) {}

  loginUser<B, R>(body: B) {
    const url: string = 'auth/login';
    return this.apiService.httpPost<B, R>(url, body);
  }  
}
