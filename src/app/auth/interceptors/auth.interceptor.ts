import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

/**
 * HTTP interceptor function for authentication.
 * Intercepts outgoing HTTP requests and attaches the authentication token if available.
 * Also handles unauthorized responses (status code 401) by redirecting to the login page.
 * @param req The outgoing HTTP request.
 * @param next The HTTP handler for the next interceptor in the chain.
 * @returns An observable of the HTTP response.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Token ${token}` },
    });
    return next(cloned);
  }

  return next(req).pipe(
    catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          router.navigateByUrl('login');
        }
      }
      return throwError(() => {
        err;
      });
    })
  );
};
