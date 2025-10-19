import { createReducer, on } from '@ngrx/store';
import * as CustomerActions from './customer.actions';
import { CustomerState, initialCustomerState } from './customer.state';

export const customerReducer = createReducer(
  initialCustomerState,

  // Load Customers
  on(CustomerActions.loadCustomers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CustomerActions.loadCustomersSuccess, (state, { customers }) => ({
    ...state,
    customers,
    loading: false,
    error: null
  })),

  on(CustomerActions.loadCustomersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load Single Customer
  on(CustomerActions.loadCustomer, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CustomerActions.loadCustomerSuccess, (state, { customer }) => ({
    ...state,
    selectedCustomer: customer,
    loading: false,
    error: null
  })),

  on(CustomerActions.loadCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add Customer
  on(CustomerActions.addCustomer, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CustomerActions.addCustomerSuccess, (state, { customer }) => ({
    ...state,
    customers: [...state.customers, customer],
    loading: false,
    error: null
  })),

  on(CustomerActions.addCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update Customer
  on(CustomerActions.updateCustomer, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CustomerActions.updateCustomerSuccess, (state, { customer }) => ({
    ...state,
    customers: state.customers.map(c => c.id === customer.id ? customer : c),
    selectedCustomer: state.selectedCustomer?.id === customer.id ? customer : state.selectedCustomer,
    loading: false,
    error: null
  })),

  on(CustomerActions.updateCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Delete Customer
  on(CustomerActions.deleteCustomer, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CustomerActions.deleteCustomerSuccess, (state, { id }) => ({
    ...state,
    customers: state.customers.filter(c => c.id !== id),
    selectedCustomer: state.selectedCustomer?.id === id ? null : state.selectedCustomer,
    loading: false,
    error: null
  })),

  on(CustomerActions.deleteCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Clear Selected Customer
  on(CustomerActions.clearSelectedCustomer, (state) => ({
    ...state,
    selectedCustomer: null
  })),

  // Set Search Term
  on(CustomerActions.setSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm
  })),

  // Set Sort Options
  on(CustomerActions.setSortOptions, (state, { sortBy, sortOrder }) => ({
    ...state,
    sortBy,
    sortOrder
  }))
);
