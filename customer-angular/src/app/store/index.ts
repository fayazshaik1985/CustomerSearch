import { ActionReducerMap } from '@ngrx/store';
import { customerReducer } from './customer/customer.reducer';
import { CustomerState } from './customer/customer.state';

export interface AppState {
  customers: CustomerState;
}

export const reducers: ActionReducerMap<AppState> = {
  customers: customerReducer
};
