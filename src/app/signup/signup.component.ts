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
      name: ['', Validators.required,onlyAlphabetsValidator],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    },
   {
  validators: passwordMatchValidator  
});
}

 get name() { return this.signupForm.get('name'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }
  get terms() { return this.signupForm.get('terms'); }


  allowOnlyAlphabets(event: KeyboardEvent) {
  const char = event.key;
  const regex = /^[a-zA-Z ]$/;
  if (!regex.test(char)) {
    event.preventDefault();
  }
  }
    onSubmit() {
    this.passwordMismatch = false;
      this.submitted = true;

         if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();  

      this.authService.signup(this.signupForm.value).subscribe({
      next: (response) => {
      console.log('Signup successful', response);
        
      },
      error: (err) => {
      console.error('Signup error', err);
    }
  });

      return;
    }

     if (this.signupForm.invalid) return;


    if (this.password?.value !== this.confirmPassword?.value) {
      this.passwordMismatch = true;
      return;
    }

    // ✅ Proceed with signup logic (e.g., API call)
    console.log(this.signupForm.value);
  }
}