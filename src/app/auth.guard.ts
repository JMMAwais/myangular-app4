import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private http: HttpClient, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.http.get('http://localhost:7011/api/account/check-auth', { withCredentials: true }).pipe(
      map(() => true), // If authenticated
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
