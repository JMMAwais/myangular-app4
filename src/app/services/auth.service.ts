import { HttpClient, HttpResponse } from "@angular/common/http";  
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
   baseUrl="https://localhost:7011/api";


  constructor(private http: HttpClient,private router:Router) {}


login(userData: any): Observable<HttpResponse<any>> {
  return this.http.post<any>(
    `${this.baseUrl}/account/login`,
    userData,
    {
      observe: 'response',
      withCredentials: true  
    }
  );}

  signup(userData: any): Observable<HttpResponse<any>> {
  return this.http.post<any>(
    `${this.baseUrl}/account/signup`,
    userData,
    { observe: 'response',
      withCredentials: true  
     }
  );}

  logout() {
  this.http.post('/account/revoke-token', {}).subscribe(() => {
    this.router.navigate(['/login']);
  });
}

refreshToken(): Observable<any> {
  return this.http.post<any>(
    `${this.baseUrl}/account/refresh-token`,
    { withCredentials: true }
  );
}

  isTokenExpired(token: string): boolean {
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    return Math.floor(Date.now() / 1000) >= expiry;
  }
    storeTokens(token: string, refreshToken: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }
}