// contact.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'],
  standalone:true,
  imports:[CommonModule , ReactiveFormsModule],

})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  technologyModules = [
    { value: 'angular', label: 'Angular Framework' },
    { value: 'react', label: 'React.js' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'node', label: 'Node.js' },
    { value: 'express', label: 'Express.js' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'aws', label: 'AWS Services' },
    { value: 'azure', label: 'Microsoft Azure' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'dotnet', label: '.NET Core' },
    { value: 'microservices', label: 'Microservices Architecture' },
    { value: 'graphql', label: 'GraphQL' },
    { value: 'restapi', label: 'REST API' }
  ];

  inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'career', label: 'Career Opportunities' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^\+?[\d\s\-\(\)]+$/)]],
      company: [''],
      position: [''],
      inquiryType: ['', Validators.required],
      technologyModules: [[]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(20)]],
      newsletter: [false],
      privacyAccepted: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.contactForm.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return `${this.getFieldLabel(fieldName)} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${this.getFieldLabel(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['pattern']) return 'Please enter a valid phone number';
    }
    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      company: 'Company',
      position: 'Position',
      inquiryType: 'Inquiry Type',
      subject: 'Subject',
      message: 'Message',
      privacyAccepted: 'Privacy Policy'
    };
    return labels[fieldName] || fieldName;
  }

  onTechnologyChange(event: any, technology: string): void {
    const selectedModules = this.contactForm.get('technologyModules')?.value || [];
    
    if (event.target.checked) {
      if (!selectedModules.includes(technology)) {
        selectedModules.push(technology);
      }
    } else {
      const index = selectedModules.indexOf(technology);
      if (index > -1) {
        selectedModules.splice(index, 1);
      }
    }
    
    this.contactForm.patchValue({ technologyModules: selectedModules });
  }

  isTechnologySelected(technology: string): boolean {
    const selectedModules = this.contactForm.get('technologyModules')?.value || [];
    return selectedModules.includes(technology);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitError = '';
      
      // Simulate API call
      setTimeout(() => {
        // In a real application, you would make an HTTP call here
        console.log('Form submitted:', this.contactForm.value);
        
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.contactForm.reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  resetForm(): void {
    this.contactForm.reset();
    this.submitSuccess = false;
    this.submitError = '';
  }
}

/* contact.component.css */

// app.module.ts or contact.module.ts
