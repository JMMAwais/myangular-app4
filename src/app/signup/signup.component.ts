import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule,FormGroup,FormBuilder,Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { passwordMatchValidator } from '../validators/password-match.validator';
import { AuthService } from '../services/auth.service';
import { onlyAlphabetsValidator } from '../validators/only-alphabets.validator';


@Component({
  selector: 'app-signup',
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted = false;
  passwordMismatch: boolean = false;

  constructor(private fb: FormBuilder,private authService: AuthService) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required,onlyAlphabetsValidator]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
      
    },
   {
  validators: passwordMatchValidator  
});
}

 get name() { return this.signupForm.get('name'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }



  allowOnlyAlphabets(event: KeyboardEvent) {
  const char = event.key;
  const regex = /^[a-zA-Z ]$/;
  if (!regex.test(char)) {
    event.preventDefault();
  }
  }

  removeEmoji(event: any) {
  const input = event.target;
  input.value = input.value.replace(/[^\x00-\x7F]/g, '');
}
   onSubmit() {
  this.passwordMismatch = false;
  this.submitted = true;

  if (this.signupForm.invalid){
  this.signupForm.markAllAsTouched();  
  }
  
  // Stop if form is invalid
  if (this.signupForm.invalid) {
    console.log('Invalid form');
    return;
  }

  // Check password match
  if (this.password?.value !== this.confirmPassword?.value) {
    this.passwordMismatch = true;
    return;
  }

  // ✅ Form is valid, make API call
  this.authService.signup(this.signupForm.value).subscribe({
    next: (response) => {
      console.log('Signup successful', response);
      // Navigate or show success message
    },
    error: (err) => {
      console.error('Signup error', err);
    }
  });
}
}