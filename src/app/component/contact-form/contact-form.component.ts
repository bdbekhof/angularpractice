import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9 -]*$')]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

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

  onSubmit() {
    if(!this.contactForm.valid) {
      return;
    }
  }
}
