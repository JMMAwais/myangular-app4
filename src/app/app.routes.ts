import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { authGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
        {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
    {
    path: '',
    loadComponent: () =>
      import('./app.component').then(m => m.AppComponent)  
  },
    
    {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then(m => m.LoginComponent)
  }
  ,{
  path: 'dashboard',
  loadComponent: () =>
    import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
  canActivate: [authGuard]
},
  { path: 'signup', component: SignupComponent }
];
