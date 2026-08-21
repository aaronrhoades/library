// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Synchronously evaluate the computed boolean signal
  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirect unauthenticated users to the login route
  return router.createUrlTree(['/login']);
};
