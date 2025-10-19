import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from './customer.state';

export const selectCustomerState = createFeatureSelector<CustomerState>('customers');

export const selectCustomers = createSelector(
  selectCustomerState,
  (state) => state.customers
);

export const selectSelectedCustomer = createSelector(
  selectCustomerState,
  (state) => state.selectedCustomer
);

export const selectLoading = createSelector(
  selectCustomerState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectCustomerState,
  (state) => state.error
);

export const selectSearchTerm = createSelector(
  selectCustomerState,
  (state) => state.searchTerm
);

export const selectSortOptions = createSelector(
  selectCustomerState,
  (state) => ({
    sortBy: state.sortBy,
    sortOrder: state.sortOrder
  })
);

export const selectFilteredCustomers = createSelector(
  selectCustomers,
  selectSearchTerm,
  (customers, searchTerm) => {
    if (!searchTerm) return customers;
    return customers.filter(customer =>
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
);

export const selectSortedCustomers = createSelector(
  selectFilteredCustomers,
  selectSortOptions,
  (customers, { sortBy, sortOrder }) => {
    return [...customers].sort((a, b) => {
      const aValue = a[sortBy as keyof typeof a] ?? '';
      const bValue = b[sortBy as keyof typeof b] ?? '';
      
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }
);
