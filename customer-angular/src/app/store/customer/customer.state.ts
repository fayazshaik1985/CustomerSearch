import { Customer } from '../../../services/customer.service';

export interface CustomerState {
  customers: Customer[];
  selectedCustomer: Customer | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export const initialCustomerState: CustomerState = {
  customers: [],
  selectedCustomer: null,
  loading: false,
  error: null,
  searchTerm: '',
  sortBy: 'firstName',
  sortOrder: 'asc'
};
