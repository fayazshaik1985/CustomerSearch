import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { DataService } from '../services/data.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const dataService = inject(DataService);
  const email = localStorage.getItem('email');

  if (email && email.trim().length > 0) {
    dataService.updateIsLoggedIn(true);
        
    return true;
  }

  return router.parseUrl('/login');
};


