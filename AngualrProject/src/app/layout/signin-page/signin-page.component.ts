import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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


