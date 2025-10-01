import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'  
})
export class CustomerService {
  
  private readonly API_BASE_URL = 'https://localhost:5000/api/Customers';

  constructor(private readonly http: HttpClient) { }

  getCustomers(options: { sortBy?: string; sortOrder?: 'asc' | 'desc'; search?: string } = {}): Observable<any[]> {
    let params = new HttpParams();
    if (options.sortBy) {
      params = params.set('sortBy', options.sortBy).set('sortOrder', options.sortOrder || 'asc');
    }
    if (options.search) {
      params = params.set('search', options.search);
    }
    return this.http
      .get<any[]>(this.API_BASE_URL, { params })
      .pipe(catchError(err => throwError(() => new Error(`HTTP error! status: ${err.status ?? 'network/error'}`))));
  }

  getCustomer(id: number | string): Observable<any> {
    return this.http
      .get<any>(`${this.API_BASE_URL}/${id}`)
      .pipe(catchError(err => throwError(() => new Error(`HTTP error! status: ${err.status ?? 'network/error'}`))));
  }

  addCustomer(customer: any): Observable<any> {
    return this.http
      .post<any>(this.API_BASE_URL, customer)
      .pipe(catchError(err => throwError(() => new Error(`HTTP error! status: ${err.status ?? 'network/error'}`))));
  }

  updateCustomer(id: number | string, customer: any): Observable<any> {
    return this.http
      .put<any>(`${this.API_BASE_URL}/${id}`, customer)
      .pipe(catchError(err => throwError(() => new Error(`HTTP error! status: ${err.status ?? 'network/error'}`))));
  }

  deleteCustomer(id: number | string): Observable<void> {
    return this.http
      .delete<void>(`${this.API_BASE_URL}/${id}`)
      .pipe(catchError(err => throwError(() => new Error(`HTTP error! status: ${err.status ?? 'network/error'}`))));
  }
}
