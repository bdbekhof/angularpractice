import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { }

  submitForm(formData: any): void {
    console.log('Form received in service: ', formData);
  }
}
