import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-signin-page',

  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css'],
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule]
})
export class SigninPageComponent {
    


  signinForm: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }










  forgotPassword() {
    //want to functioning the firebase forgot password functionality
    // This is a placeholder for the actual forgot password logic
    console.log('Forgot password clicked');
    
    const email = this.signinForm.get('email')?.value;
    if (email) {
      // Call your Firebase forgot password function here
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Password reset email sent successfully');
      })
      .catch((error) => {
        console.error('Error sending password reset email:', error);
      });
    } else {
      console.log('Email is required for password reset');
    }
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.signinForm.valid) {
      this.isLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Sign in attempt:', this.signinForm.value);
        this.isLoading = false;
        // Handle successful sign in here
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.signinForm.controls).forEach(key => {
        this.signinForm.get(key)?.markAsTouched();
      });
    }
  }
}


