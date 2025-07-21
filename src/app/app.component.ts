import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirstComponentComponent } from "./component/first-component/first-component.component";
import { IntroductionComponent } from "./component/introduction/introduction.component";
import { ColorChangeComponent } from "./component/color-change/color-change.component";
import { StudentListComponent } from "./component/student-list/student-list.component";

@Component({
  selector: 'app-root',
  imports: [FirstComponentComponent, IntroductionComponent, ColorChangeComponent, StudentListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Daily';
}
