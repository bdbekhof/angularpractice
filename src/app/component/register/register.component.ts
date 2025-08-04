import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    if(!this.registerForm.valid) return;

    const {name, email, password, confirmPassword } = this.registerForm.value;

    if(password !== confirmPassword) return;

    const newUser = { name, email, password };

    this.http.post('http://localhost:3000/users', newUser).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('Registration failed:', err)
    });
  }
}
