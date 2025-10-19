import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Customer } from '../../../services/customer.service';
import * as CustomerActions from './customer.actions';
import * as CustomerSelectors from './customer.selectors';
import { CustomerState } from './customer.state';

@Injectable({
  providedIn: 'root'
})
export class CustomerStoreService {
  private store = inject(Store<{ customers: CustomerState }>);

  // Selectors
  customers$: Observable<Customer[]> = this.store.select(CustomerSelectors.selectCustomers);
  selectedCustomer$: Observable<Customer | null> = this.store.select(CustomerSelectors.selectSelectedCustomer);
  loading$: Observable<boolean> = this.store.select(CustomerSelectors.selectLoading);
  error$: Observable<string | null> = this.store.select(CustomerSelectors.selectError);
  searchTerm$: Observable<string> = this.store.select(CustomerSelectors.selectSearchTerm);
  sortOptions$: Observable<{ sortBy: string; sortOrder: 'asc' | 'desc' }> = this.store.select(CustomerSelectors.selectSortOptions);
  filteredAndSortedCustomers$: Observable<Customer[]> = this.store.select(CustomerSelectors.selectSortedCustomers);

  // Actions
  loadCustomers(options?: { sortBy?: string; sortOrder?: 'asc' | 'desc'; search?: string }): void {
    this.store.dispatch(CustomerActions.loadCustomers(options || {}));
  }

  loadCustomer(id: number | string): void {
    this.store.dispatch(CustomerActions.loadCustomer({ id }));
  }

  addCustomer(customer: Partial<Customer>): void {
    this.store.dispatch(CustomerActions.addCustomer({ customer }));
  }

  updateCustomer(id: number | string, customer: Partial<Customer>): void {
    this.store.dispatch(CustomerActions.updateCustomer({ id, customer }));
  }

  deleteCustomer(id: number | string): void {
    this.store.dispatch(CustomerActions.deleteCustomer({ id }));
  }

  clearSelectedCustomer(): void {
    this.store.dispatch(CustomerActions.clearSelectedCustomer());
  }

  setSearchTerm(searchTerm: string): void {
    this.store.dispatch(CustomerActions.setSearchTerm({ searchTerm }));
  }

  setSortOptions(sortBy: string, sortOrder: 'asc' | 'desc'): void {
    this.store.dispatch(CustomerActions.setSortOptions({ sortBy, sortOrder }));
  }
}
