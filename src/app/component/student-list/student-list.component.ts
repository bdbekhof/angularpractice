import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../../interface/student';
import { StudentService } from '../../services/student.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { fadeInOut } from '../../animations/fade/fade.animation';

@Component({
  selector: 'app-student-list',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
  animations: [fadeInOut],
})
export class StudentListComponent {
  students: Student[] = [];
  showPresent: boolean = true;
  selectedStudent: Student | null = null;
  isModalOpen = false;

  private studentService = inject(StudentService);

  addStudentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  // Add student getters
  get firstName() {
    return this.addStudentForm.get('firstName');
  }

  get lastName() {
    return this.addStudentForm.get('lastName');
  }

  get email() {
    return this.addStudentForm.get('email');
  }

  // Error getter
  getErrorMessage(fieldName: string): string | null {
    const control = this.addStudentForm.get(fieldName);

    if(!control || !control.errors) return null;

    if(control.hasError('required')) {
      return 'This field is required.';
    }

    switch(fieldName) {
      case 'firstName':
        if(control.hasError('pattern')) return 'Only a-z, A-Z and spaces are allowed.';
        break;
      case 'lastname':
        if(control.hasError('pattern')) return 'Please enter a valid email address.';
        break;
      case 'email':
        if(control.hasError('email')) return 'Only letters, numbers, spaces and dashes are allowed.';
        break;
    }

    return null;
  }

  updateStudentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

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

  addStudent() {
    const newStudent: Omit<Student, 'id' | 'createdAt' | 'updatedAt'> = {
      firstName: this.addStudentForm.get('firstName')?.value ?? '',
      lastName: this.addStudentForm.get('lastName')?.value ?? '',
      email: this.addStudentForm.get('email')?.value ?? '',
      present: true,
    };

    this.studentService.addStudent(newStudent).subscribe({
      next: (studentFromApi) => {
        this.students.push(studentFromApi);
        this.addStudentForm.reset();
      },
      error: (err) => {
        console.error("Couldn't add student: ", err);
      }
    });
  }

  toggleFilter() {
    this.showPresent = !this.showPresent;
  }

  togglePresent(student: Student) {
    const updated = { ...student, present: !student.present };

    this.studentService.updateStudent(updated).subscribe({
      next: (result) => {
        student.present = result.present;
      },
      error: (err) => {
        console.error("Couldn't update student:", err);
      }
    });
  }

  openStudentModal(student: Student) {
    this.selectedStudent = {...student};
    this.isModalOpen = true;

    // console.log('Student to patch: ', student)
    this.updateStudentForm.patchValue({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
    });
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedStudent = null;
  }

  updateStudent() {
    if(!this.selectedStudent) return;

    const updatedStudent = {
      ...this.selectedStudent,
      ...this.updateStudentForm.value,
      updatedAt: new Date().toISOString(),
    } as Student;

    this.studentService.updateStudent(updatedStudent).subscribe({
      next: (res) => {
        const i = this.students.findIndex(s => s.id === res.id);
        if(i !== -1) this.students[i] = res;
        this.closeModal();
      },
      error: (err) => console.error("Update error:", err)
    });
  }

  deleteStudent() {
    if(!this.selectedStudent) return;
    this.studentService.deleteStudent(this.selectedStudent.id).subscribe({
      next: () => {
        this.students = this.students.filter(s => s.id !== this.selectedStudent?.id);
        this.closeModal();
      },
      error: (err) => console.error("Deletion error:", err)
    });
  }
}
