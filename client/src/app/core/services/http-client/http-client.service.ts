import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParamsOptions,
} from '@angular/common/http';

/**
 * For keeping it simple I used this const here
 * for real world scenario I would have used environment.ts and angular.json file
 * and set the base url there depending on the environment like dev, prod, etc.
 */
const AUTH_API = 'http://localhost:3000/api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, options?: any) {
    return this.http.get<T>(AUTH_API + url);
  }

  post<T>(url: string, data: any, httpOptions?: any) {
    return this.http.post<T>(AUTH_API + url, data);
  }

  delete<T>(url: string, options?: any) {
    return this.http.delete<T>(AUTH_API + url);
  }

  put<T>(url: string, data: any, options?: any) {
    return this.http.put<T>(AUTH_API + url, data);
  }
}
