import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './contact-page.component';
import { By } from '@angular/platform-browser';


let component: ContactComponent; // Not ContactComponent

await TestBed.configureTestingModule({
  imports: [ReactiveFormsModule],
  declarations: [ContactComponent] // Now you're declaring it, not importing it as a standalone
}).compileComponents();

fixture = TestBed.createComponent(ContactComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.contactForm).toBeDefined();
    expect(component.contactForm.valid).toBeFalse();

    const values = component.contactForm.value;
    expect(values.firstName).toBe('');
    expect(values.lastName).toBe('');
    expect(values.email).toBe('');
    expect(values.privacyAccepted).toBeFalse();
  });

  it('should mark required fields as invalid when empty', () => {
    const form = component.contactForm;

    form.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      inquiryType: '',
      message: '',
      privacyAccepted: false
    });

    expect(form.get('firstName')?.valid).toBeFalse();
    expect(form.get('email')?.valid).toBeFalse();
    expect(form.get('privacyAccepted')?.valid).toBeFalse();
  });

  it('should submit the form if it is valid', () => {
    spyOn(component, 'onSubmit');
    const form = component.contactForm;

    form.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      subject: 'Support Needed',
      inquiryType: 'support',
      message: 'Please help.',
      privacyAccepted: true
    });

    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', {});
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should add technology to selected list on checkbox check', () => {
    component.selectedTechnologies = [];
    component.onTechnologyChange({ target: { checked: true } } as any, 'angular');
    expect(component.selectedTechnologies).toContain('angular');
  });

  it('should remove technology from selected list on checkbox uncheck', () => {
    component.selectedTechnologies = ['angular', 'react'];
    component.onTechnologyChange({ target: { checked: false } } as any, 'angular');
    expect(component.selectedTechnologies).not.toContain('angular');
  });

  it('should reset the form and clear selections on reset', () => {
    component.contactForm.patchValue({
      firstName: 'Alice',
      email: 'alice@example.com',
      privacyAccepted: true
    });
    component.selectedTechnologies = ['angular'];

    component.resetForm();
    expect(component.contactForm.get('firstName')?.value).toBe('');
    expect(component.selectedTechnologies.length).toBe(0);
  });

  it('should disable submit button if form is invalid', () => {
    const button = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
  });

  it('should show success message when submitSuccess is true', () => {
    component.submitSuccess = true;
    fixture.detectChanges();
    const successMsg = fixture.debugElement.query(By.css('.alert-success'));
    expect(successMsg).toBeTruthy();
  });

  it('should show error message when submitError is set', () => {
    component.submitError = 'Something went wrong';
    fixture.detectChanges();
    const errorMsg = fixture.debugElement.query(By.css('.alert-error'));
    expect(errorMsg.nativeElement.textContent).toContain('Something went wrong');
  });
});
