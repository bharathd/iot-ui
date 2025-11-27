import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiEndpoint = '';

  constructor(private http: HttpClient) {
    // this.apiEndpoint = this.getApiEndpoint();
  }

  // getApiEndpoint(): string {
  // }

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
