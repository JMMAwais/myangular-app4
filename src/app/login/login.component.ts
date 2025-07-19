import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 loginForm: FormGroup;
 submitted = false;
  constructor(private fb: FormBuilder,private authService: AuthService)
  {
      this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.pattern(/^(?=.*[A-Z]).+$/) ]],
      remember: [false]
  });
}

  onSubmit() {
       this.submitted = true;

    if (this.loginForm.valid) {
    
        this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('hehe',response.body.refreshToken) 
      },
      error: (err) => {
      console.error('Login error', err);
    }
  });


    } else {
      this.loginForm.markAllAsTouched();
    }
  }
    get email() {
    return this.loginForm.get('email');
  }

    get password() {
    return this.loginForm.get('password');
  }
}