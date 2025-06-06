// signup.component.ts
import { CommonModule, NgIf,NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { getAuth , createUserWithEmailAndPassword} from '@angular/fire/auth'; // Import AngularFireAuth if you plan to use Firebase Auth
import { FirebaseService } from '../../../../FireBase/BackEnd/FireBaseConfig'; // Adjust the path as necessary

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
  imports:[CommonModule,ReactiveFormsModule,RouterLink]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private firebaseService: FirebaseService
  ) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {}

  // Custom password validator
  passwordValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
    return valid ? null : { 'passwordStrength': true };
  }

  // Password match validator
  passwordMatchValidator(group: AbstractControl): {[key: string]: any} | null {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');
    
    if (!password || !confirmPassword) return null;
    
    return password.value === confirmPassword.value ? null : { 'passwordMismatch': true };
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.signupForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    if (field.errors['required']) return `${this.getFieldLabel(fieldName)} is required`;
    if (field.errors['email']) return 'Please enter a valid email address';
    if (field.errors['minlength']) return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
    if (field.errors['passwordStrength']) return 'Password must contain uppercase, lowercase, number and special character';
    if (fieldName === 'confirmPassword' && this.signupForm.errors?.['passwordMismatch']) return 'Passwords do not match';
    
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: {[key: string]: string} = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.signupForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  onSubmit(): void {
    let auth = getAuth(); // Placeholder for Firebase Auth, adjust based on your setup
    if (this.signupForm.valid) {
      this.isLoading = true;
      
      const formData = this.signupForm.value;
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      };

     createUserWithEmailAndPassword(auth, userData.email, userData.password)
        .then((response) => {
          // User signed up successfully
          const user = response.user;
          console.log('User signed up:', user);
          this.isLoading = false;
          alert('Account created successfully! Welcome to ModuleFinder!');
          // Navigate to login or another page
          this.router.navigate(['/login']);
        })
        .catch((error) => {
          console.error('Error signing up:', error);
          this.isLoading = false;
          alert('Error creating account. Please try again.');
        });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.signupForm.controls).forEach(key => {
      const control = this.signupForm.get(key);
      control?.markAsTouched();
    });
  }

  signupWithGoogle(): void {
    // Implement Google OAuth
    console.log('Google signup clicked');
    alert('Google signup integration would be implemented here');
  }

  signupWithGithub(): void {
    // Implement GitHub OAuth
    console.log('GitHub signup clicked');
    alert('GitHub signup integration would be implemented here');
  }

  goToLogin(): void {
    this.router.navigate(['/signIn']);
  }
}