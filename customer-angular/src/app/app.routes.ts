import { Routes } from '@angular/router';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  {
    path: 'customers',
    loadComponent: () => import('./customers/customer-list/customer-list.component').then(m => m.CustomerListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'customer/add',
    loadComponent: () => import('./customers/customer-form/customer-form.component').then(m => m.CustomerFormComponent),
    canActivate: [authGuard]
  },
  {
    path: 'customer/edit/:id',
    loadComponent: () => import('./customers/customer-form/customer-form.component').then(m => m.CustomerFormComponent),
    canActivate: [authGuard]
  },

  {
    path: 'products',
    loadComponent: () => import('./customers/customer-list/customer-list.component').then(m => m.CustomerListComponent),
    canActivate: [authGuard]
  },

  { path: '**', redirectTo: 'dashboard' },
];
