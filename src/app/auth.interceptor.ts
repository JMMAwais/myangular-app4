import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const cloned = req.clone({ withCredentials: true });
  const http = inject(HttpClient);
  const authService = inject(AuthService);

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('refresh-token')) {
        // Try refreshing token

        return authService.refreshToken().pipe(
          switchMap(() => next(cloned)),
          catchError(refreshError => {
            console.error('Refresh failed', refreshError);
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};