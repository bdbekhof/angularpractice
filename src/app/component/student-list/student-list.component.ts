import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../../interface/student';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-student-list',
  imports: [FormsModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  students: Student[] = [];
  firstName = '';
  lastName = '';
  email = '';
  showPresent: boolean = true;

  private studentService = inject(StudentService);

  ngOnInit() {
    this.studentService.getStudents().subscribe({
      next: (data: Student[]) => {
        this.students = data;
      },
      error: (err) => {
        console.error('Retrieving students went wrong:', err);
      }
    });
  }

  resetForm() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
  }

  addStudent() {
    const newStudent: Omit<Student, 'id' | 'createdAt' | 'updatedAt'> = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      present: true,
    };

    this.studentService.addStudent(newStudent).subscribe({
      next: (studentFromApi) => {
        this.students.push(studentFromApi);
        this.resetForm();
      },
      error: (err) => {
        console.error("Couldn't add student: ", err);
      }
    })
  }

  toggleFilter() {
    this.showPresent = !this.showPresent;
  }
}
