import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private apiService: ApiService) {}

  getOrganizationDeatails<R>(): Observable<R> {
    const url = `orgnaization-details`;
    return this.apiService.httpGet<R>(url);
  }
}
