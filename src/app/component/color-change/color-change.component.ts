import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-color-change',
  imports: [FormsModule],
  templateUrl: './color-change.component.html',
  styleUrl: './color-change.component.css'
})
export class ColorChangeComponent {
  color = '';
}
