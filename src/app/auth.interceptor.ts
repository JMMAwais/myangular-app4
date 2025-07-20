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

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const cloned = req.clone({ withCredentials: true });
  const http = inject(HttpClient);

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('refresh-token')) {
        // Try refreshing token
        return http.post('http://localhost:7011/api/account/refresh-token', {}, { withCredentials: true }).pipe(
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