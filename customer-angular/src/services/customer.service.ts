import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string; // ISO date string
  phone?: string;
}

export interface GetCustomersOptions {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private readonly http = inject(HttpClient);
  private readonly API_BASE_URL = 'https://localhost:5000/api/Customers';

  getCustomers(options: GetCustomersOptions = {}): Observable<Customer[]> {
    let params = new HttpParams();
    if (options.sortBy) {
      params = params
        .set('sortBy', options.sortBy)
        .set('sortOrder', options.sortOrder || 'asc');
    }
    if (options.search) {
      params = params.set('search', options.search);
    }
    return this.http
      .get<Customer[]>(this.API_BASE_URL, { params })
      .pipe(catchError(err => throwError(() => new Error(`HTTP error! status: ${err.status ?? 'network/error'}`))));
  }

  getCustomer(id: number | string): Observable<Customer> {
    return this.http
      .get<Customer>(`${this.API_BASE_URL}/${id}`)
      .pipe(catchError(err => throwError(() => new Error(`HTTP error! status: ${err.status ?? 'network/error'}`))));
  }

  addCustomer(customer: Partial<Customer>): Observable<Customer> {
    return this.http
      .post<Customer>(this.API_BASE_URL, customer)
      .pipe(catchError(err => throwError(() => new Error(`HTTP error! status: ${err.status ?? 'network/error'}`))));
  }

  updateCustomer(id: number | string, customer: Partial<Customer>): Observable<Customer> {
    return this.http
      .put<Customer>(`${this.API_BASE_URL}/${id}`, customer)
      .pipe(catchError(err => throwError(() => new Error(`HTTP error! status: ${err.status ?? 'network/error'}`))));
  }

  deleteCustomer(id: number | string): Observable<void> {
    return this.http
      .delete<void>(`${this.API_BASE_URL}/${id}`)
      .pipe(catchError(err => throwError(() => new Error(`HTTP error! status: ${err.status ?? 'network/error'}`))));
  }
}


