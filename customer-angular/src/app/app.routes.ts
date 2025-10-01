import { Routes } from '@angular/router';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'customers' },
  {
    path: 'customers',
    component: CustomerListComponent,
  },
  {
    path: 'customer/add',
    component: CustomerFormComponent,
  },
  {
    path: 'customer/edit/:id',
    component: CustomerFormComponent,
  },
  { path: '**', redirectTo: 'customers' },
];
