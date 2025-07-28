import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { fadeInOut } from '../../animations/fade/fade.animation';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
  animations: [fadeInOut],
})
export class ContactFormComponent {
  constructor(private contactService: ContactService) {}

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 -]*$')]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  submitStatus: 'visible' | 'hidden' = 'hidden';

  // Getters to make available in other files.
  get name() {
    return this.contactForm.get('name');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get subject() {
    return this.contactForm.get('subject');
  }

  get message() {
    return this.contactForm.get('message');
  }

  // Error getter
  getErrorMessage(fieldName: string): string | null {
    const control = this.contactForm.get(fieldName);

    if(!control || !control.errors) return null;

    if(control.hasError('required')) {
      return 'This field is required.';
    }

    switch(fieldName) {
      case 'name':
        if(control.hasError('pattern')) return 'Only a-z, A-Z and spaces are allowed.';
        break;
      case 'email':
        if(control.hasError('email')) return 'Please enter a valid email address.';
        break;
      case 'subject':
        if(control.hasError('pattern')) return 'Only letters, numbers, spaces and dashes are allowed.';
        break;
      case 'message':
        if(control.hasError('minlength')) return 'Message must be at least 10 characters.';
        break;
    }

    return null;
  }


  onSubmit() {
    if(!this.contactForm.valid) {
      return;
    }

    this.contactService.submitForm(this.contactForm.value);
    this.contactForm.reset();
    this.submitStatus = 'visible';
    setTimeout(() => {
      this.submitStatus = 'hidden';
    }, 5000);
  }
}
