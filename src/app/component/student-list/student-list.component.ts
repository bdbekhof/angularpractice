import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../../interface/student';

@Component({
  selector: 'app-student-list',
  imports: [FormsModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  students: Student[] = [
    {id: 0, firstName: 'Sophie', lastName: 'Aster', email: 'SophieAs92@gmail.com', present: true},
    {id: 1, firstName: 'Lars', lastName: 'Bellio', email: 'Larsio@gmail.com', present: true},
    {id: 2, firstName: 'Fashid', lastName: 'Iraqui', email: 'Fasiraqui93@outlook.com', present: true},
    {id: 3, firstName: 'Daan', lastName: 'Kersen', email: 'Daankers@hotmail.com', present: true},
    {id: 4, firstName: 'Jasmin', lastName: 'Versams', email: 'JasminVersams@gmail.com', present: false},
  ];

  firstName = '';
  lastName = '';
  email = '';
  showPresent: boolean = true;

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
  }

  addStudent() {
    if(![this.firstName, this.lastName, this.email].some(v => !v.trim())) {  
      const id = Math.max(0, ...this.students.map(s => s.id)) + 1;

      const newStudent = {
        id: id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        present: true,
      };

      this.students.push(newStudent);
      this.resetForm();
    }
  }

  toggleFilter() {
    this.showPresent = !this.showPresent;
  }
}
