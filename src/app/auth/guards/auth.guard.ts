import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Authentication guard function.
 * Checks if the user is authenticated.
 * If authenticated, returns true; otherwise, redirects to the login page and returns false.
 * @param route The route being activated.
 * @param state The current router state.
 * @returns A boolean indicating whether the user is authenticated or not.
 */
export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.checkAuth();

  if (isAuthenticated) return true;
  else {
    router.navigateByUrl('/login');
    return false;
  }
};
