import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiEndpoint = '';

  constructor(private http: HttpClient) {
    this.apiEndpoint = this.getApiEndpoint();
  }

  getApiEndpoint(): string {
    const port = window.location.port;
    const endpoints: { [key: string]: string } = {
      '4200': 'https://iot-api.azurewebsites.net/api/',
      // '4000': 'http://159.65.155.140:8004/api/', // V1-Prod
      // '4040': 'http://159.65.155.140:8040/api/', // V2-Prod
    };
    return endpoints[port] || 'https://iot-api.azurewebsites.net/api/';
  }

  httpGet<R>(url: string, headers?: HttpHeaders, params?: HttpParams, responseType?: string): Observable<R> {
    const apiUrl = `${this.apiEndpoint}${url}`;
    const options = {
      headers: headers ? headers : {},
      params: params ? params : {},
    };
    if (responseType) {
      (options as any).responseType = responseType;
    }

    return this.http.get<R>(apiUrl, options);
  }

  httpPost<B, R>(url: string, body: B, options?: any): Observable<any> {
    return this.http.post<R>(`${this.apiEndpoint}${url}`, body, options ? options : {});
  }

  httpPut<B, R>(url: string, body: B, headers?: HttpHeaders): Observable<R> {
    if (headers) {
      return this.http.put<R>(`${this.apiEndpoint}${url}`, body, {
        headers: headers,
      });
    }
    return this.http.put<R>(`${this.apiEndpoint}${url}`, body);
  }

  httpDelete<R>(url: string, headers?: HttpHeaders): Observable<R> {
    if (headers) {
      return this.http.delete<R>(`${this.apiEndpoint}${url}`, {
        headers: headers,
      });
    }
    return this.http.delete<R>(`${this.apiEndpoint}${url}`);
  }
}
