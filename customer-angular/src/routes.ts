import { Routes } from '@angular/router';
import { RedirectCommand } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'customers' },
  {
    path: 'customers',
    loadComponent: () => import('./customers/customer-list.component').then(m => m.CustomerListComponent),
  },
  {
    path: 'customer/add',
    loadComponent: () => import('./customers/customer-form.component').then(m => m.CustomerFormComponent),
  },
  {
    path: 'customer/edit/:id',
    loadComponent: () => import('./customers/customer-form.component').then(m => m.CustomerFormComponent),
  },
  { path: '**', redirectTo: 'customers' },
];


