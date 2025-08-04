import { Routes } from '@angular/router';
import { FirstComponentComponent } from './component/first-component/first-component.component';
import { IntroductionComponent } from './component/introduction/introduction.component';
import { ColorChangeComponent } from './component/color-change/color-change.component';
import { StudentListComponent } from './component/student-list/student-list.component';
import { ContactFormComponent } from './component/contact-form/contact-form.component';
import { LoginComponent } from './component/login/login.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: '', component: FirstComponentComponent },
    { path: 'introduction', component: IntroductionComponent },
    { path: 'color-change', component: ColorChangeComponent },
    { path: 'student-list', canActivate: [authGuard], loadComponent: () => import('./component/student-list/student-list.component').then(m => m.StudentListComponent) },
    { path: 'contact-form', component: ContactFormComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', loadComponent: () => import('./component/register/register.component').then(m => m.RegisterComponent) },
];
