import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-first-component',
  imports: [FormsModule],
  templateUrl: './first-component.component.html',
  styleUrl: './first-component.component.css'
})
export class FirstComponentComponent {
  name = "";
  greeting = "";

  generateGreeting() {
    this.greeting = `Welcome, ${this.name}! Good to see you here.`;
  }
}
