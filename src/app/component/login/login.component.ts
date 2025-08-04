import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { User } from '../../interface/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    loginError: string | null = null;
    apiUrl = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onLogin() {
    if(this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.http.get<User[]>(this.apiUrl).pipe(
      map(users => users.find(
        user => 
          user.email.toLowerCase().trim() === email?.toLowerCase().trim() && 
          user.password === password
      ))
    ).subscribe({
      next: (matchedUser) => {
        if(matchedUser) {
          this.authService.login();
          this.router.navigate(['/student-list']);
        } else {
          this.loginError = 'Email or password is incorrect.';
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.loginError = 'Server error. Please try again later.';
      }
    });
  }
}
