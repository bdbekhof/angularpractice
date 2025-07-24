import { Routes } from '@angular/router';
import { FirstComponentComponent } from './component/first-component/first-component.component';
import { IntroductionComponent } from './component/introduction/introduction.component';
import { ColorChangeComponent } from './component/color-change/color-change.component';
import { StudentListComponent } from './component/student-list/student-list.component';
import { ContactFormComponent } from './component/contact-form/contact-form.component';

export const routes: Routes = [
    { path: '', component: FirstComponentComponent },
    { path: 'introduction', component: IntroductionComponent },
    { path: 'color-change', component: ColorChangeComponent },
    { path: 'student-list', component: StudentListComponent },
    { path: 'contact-form', component: ContactFormComponent},
];
