// role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth-service';

export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // 1. First ensure they are authenticated at all
    if (!authService.isAuthenticated()) {
      return router.createUrlTree(['/books']);
    }

    // 2. Check if the user's roles signal matches any of the route's allowed roles
    const userRoles = authService.userRoles();
    const hasRole = allowedRoles.some(role => userRoles?.includes(role));

    if (hasRole) {
      return true;
    }
    if(authService.userRoles() == null || authService.userRoles()?.length === 0) {
      return router.createUrlTree(['/role-assignment']);
    } else {
      return router.createUrlTree(['/unauthorized'])
    }
  };
};
