import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CustomerService } from '../../../services/customer.service';
import * as CustomerActions from './customer.actions';

@Injectable()
export class CustomerEffects {
  private actions$ = inject(Actions);
  private customerService = inject(CustomerService);

  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      switchMap(({ sortBy, sortOrder, search }) =>
        this.customerService.getCustomers({ sortBy, sortOrder, search }).pipe(
          map(customers => CustomerActions.loadCustomersSuccess({ customers })),
          catchError(error => of(CustomerActions.loadCustomersFailure({ error: error.message })))
        )
      )
    )
  );

  loadCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomer),
      switchMap(({ id }) =>
        this.customerService.getCustomer(id).pipe(
          map(customer => CustomerActions.loadCustomerSuccess({ customer })),
          catchError(error => of(CustomerActions.loadCustomerFailure({ error: error.message })))
        )
      )
    )
  );

  addCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.addCustomer),
      switchMap(({ customer }) =>
        this.customerService.addCustomer(customer).pipe(
          map(newCustomer => CustomerActions.addCustomerSuccess({ customer: newCustomer })),
          catchError(error => of(CustomerActions.addCustomerFailure({ error: error.message })))
        )
      )
    )
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.updateCustomer),
      switchMap(({ id, customer }) =>
        this.customerService.updateCustomer(id, customer).pipe(
          map(updatedCustomer => CustomerActions.updateCustomerSuccess({ customer: updatedCustomer })),
          catchError(error => of(CustomerActions.updateCustomerFailure({ error: error.message })))
        )
      )
    )
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.deleteCustomer),
      switchMap(({ id }) =>
        this.customerService.deleteCustomer(id).pipe(
          map(() => CustomerActions.deleteCustomerSuccess({ id })),
          catchError(error => of(CustomerActions.deleteCustomerFailure({ error: error.message })))
        )
      )
    )
  );

  // Auto-load customers when search term or sort options change
  refreshCustomersOnSearchOrSort$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.setSearchTerm, CustomerActions.setSortOptions),
      switchMap(() => of(CustomerActions.loadCustomers({})))
    )
  );
}
