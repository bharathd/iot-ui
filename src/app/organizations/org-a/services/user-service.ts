import { Injectable } from '@angular/core';
import { ApiService } from '../../../service/api-service';
import { OrganizationDetails } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { AppConstant } from '../../../app.contstant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  private orgIdSubject = new BehaviorSubject<string | null>(this.loadOrgId());
  private orgDetailsSubject = new BehaviorSubject<OrganizationDetails | null>(this.loadOrgDetails());
  
  
  orgId$ = this.orgIdSubject.asObservable();
  orgDetails$ = this.orgDetailsSubject.asObservable();

  setOrganizationId(id: string) {
    localStorage.setItem('organizationId', id);
    this.orgIdSubject.next(id);
  }

  setOrganizationDetails(details: OrganizationDetails) {
    localStorage.setItem('organizationDetails', JSON.stringify(details));
    this.orgDetailsSubject.next(details);
  }

  getOrganizationIdValue() {
    return this.orgIdSubject.value;
  }

  getOrganizationDetailsValue() {
    return this.orgDetailsSubject.value;
  }

  private loadOrgId(): string | null {
    return localStorage.getItem('organizationId');
  }

  private loadOrgDetails(): OrganizationDetails | null {
    const data = localStorage.getItem('organizationDetails');
    if (!data) return AppConstant.ORGA;
    const stored = JSON.parse(data);
    return {
      ...AppConstant.ORGA,
      ...stored,
      config: {
        ...AppConstant.ORGA.config,
        ...(stored.config || {})
      }
    };
  }

  generateOtp<B, R>(B: B) {
    return this.apiService.httpPost<B, R>('fas/init', B);
  }

  verifyOtp<B, R>(B: B) {
    return this.apiService.httpPost<B, R>('fas/verify-otp', B);
  }
}
