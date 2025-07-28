import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../interface/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiURL = 'https://68874e78071f195ca9802e52.mockapi.io/student/students';

  constructor(private http: HttpClient) { }
    
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiURL);
  }

  addStudent(student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Observable<Student> {
    return this.http.post<Student>(this.apiURL, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
