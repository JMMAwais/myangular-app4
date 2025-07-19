import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);  
    const cookieService = inject(CookieService);
debugger
 const tokenExists = cookieService.check('token');
 if(tokenExists)
 {
  return true;
 }
   //const refreshToken = cookieService.get('refreshToken');

//    if (token && !isTokenExpired(token)) {
//   return true; 
// } 


  // if (token && isTokenExpired(token) ) {
  //   localStorage.removeItem('token');
  // }
  // if(refreshToken)
  // {
  //  return true;
  // }
   return router.createUrlTree(['/login']);

  function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000; 
  
    return Date.now() > expiry;
  } catch {
    return true; // invalid token = expired
  }
}

};
