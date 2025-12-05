import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private apiService: ApiService) {}

  getOrganizationDeatails<R>(organizationId: string): Observable<R> {
    const url = `public/organization/${organizationId}`;
    return this.apiService.httpGet<R>(url);
  }
}
