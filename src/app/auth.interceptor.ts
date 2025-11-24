import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse
} from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  
  const http = inject(HttpClient);
  const authService = inject(AuthService);

  // ⭐ GET ACCESS TOKEN
  const token = localStorage.getItem('access_token');

  // ⭐ ADD TOKEN TO HEADER
  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
  } else {
    authReq = req.clone({ withCredentials: true });
  }

  // ⭐ HANDLE REFRESH LOGIC
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('refresh-token')) {

        return authService.refreshToken().pipe(
          switchMap((res) => {

            // ⭐ NEW TOKEN SAVE
            localStorage.setItem("access_token", res.access_token);

            // ⭐ REPEAT REQUEST WITH NEW TOKEN
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${res.access_token}`
              },
              withCredentials: true
            });

            return next(newReq);
          }),
          catchError(refreshError => {
            console.error('Refresh failed', refreshError);
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
