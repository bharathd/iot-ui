import { effect, Injectable, signal } from '@angular/core';
import { ApiService } from '../../../service/api-service';
import { OrganizationDetails } from '../models/user';
import { AppConstant } from '../../../app.contstant';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  constructor(private apiService: ApiService) {
    effect(() => {
      const id = this.orgId();
      if (id !== null) {
        localStorage.setItem('organizationId', id);
      }
    });
    effect(() => {
      const details = this.orgDetails();
      if (details !== null) {
        localStorage.setItem('organizationDetails', JSON.stringify(details));
      }
    });
  }
  orgId = signal<string | null>(this.loadOrgId());
  orgDetails = signal<OrganizationDetails | null>(this.loadOrgDetails());

  setOrganizationId(id: string) {
    this.orgId.set(id);
  }

  setOrganizationDetails(details: OrganizationDetails) {
    this.orgDetails.set(details);
  }

  getOrganizationIdValue() {
    return this.orgId();
  }

  getOrganizationDetailsValue() {
    return this.orgDetails();
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
