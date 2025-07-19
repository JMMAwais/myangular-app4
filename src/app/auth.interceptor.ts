import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service'; 
import { switchMap, from, of, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    const modifiedReq = req.clone({
    withCredentials: true
  });
  return next(modifiedReq);
};