import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  constructor() { }

  login(): void {
    this.loggedIn.next(true);
  }

  logout(): void {
    this.loggedIn.next(false);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

}
