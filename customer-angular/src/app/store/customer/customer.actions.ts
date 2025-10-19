import { createAction, props } from '@ngrx/store';
import { Customer } from '../../../services/customer.service';

export const loadCustomers = createAction(
  '[Customer] Load Customers',
  props<{ sortBy?: string; sortOrder?: 'asc' | 'desc'; search?: string }>()
);

export const loadCustomersSuccess = createAction(
  '[Customer] Load Customers Success',
  props<{ customers: Customer[] }>()
);

export const loadCustomersFailure = createAction(
  '[Customer] Load Customers Failure',
  props<{ error: string }>()
);

export const loadCustomer = createAction(
  '[Customer] Load Customer',
  props<{ id: number | string }>()
);

export const loadCustomerSuccess = createAction(
  '[Customer] Load Customer Success',
  props<{ customer: Customer }>()
);

export const loadCustomerFailure = createAction(
  '[Customer] Load Customer Failure',
  props<{ error: string }>()
);

export const addCustomer = createAction(
  '[Customer] Add Customer',
  props<{ customer: Partial<Customer> }>()
);

export const addCustomerSuccess = createAction(
  '[Customer] Add Customer Success',
  props<{ customer: Customer }>()
);

export const addCustomerFailure = createAction(
  '[Customer] Add Customer Failure',
  props<{ error: string }>()
);

export const updateCustomer = createAction(
  '[Customer] Update Customer',
  props<{ id: number | string; customer: Partial<Customer> }>()
);

export const updateCustomerSuccess = createAction(
  '[Customer] Update Customer Success',
  props<{ customer: Customer }>()
);

export const updateCustomerFailure = createAction(
  '[Customer] Update Customer Failure',
  props<{ error: string }>()
);

export const deleteCustomer = createAction(
  '[Customer] Delete Customer',
  props<{ id: number | string }>()
);

export const deleteCustomerSuccess = createAction(
  '[Customer] Delete Customer Success',
  props<{ id: number | string }>()
);

export const deleteCustomerFailure = createAction(
  '[Customer] Delete Customer Failure',
  props<{ error: string }>()
);

export const clearSelectedCustomer = createAction(
  '[Customer] Clear Selected Customer'
);

export const setSearchTerm = createAction(
  '[Customer] Set Search Term',
  props<{ searchTerm: string }>()
);

export const setSortOptions = createAction(
  '[Customer] Set Sort Options',
  props<{ sortBy: string; sortOrder: 'asc' | 'desc' }>()
);
