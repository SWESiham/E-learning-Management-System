import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiEnrollment {
  apiURL = 'http://localhost:3000/enrollments';

  constructor(private http: HttpClient) {}

  getEnrollments() {
    return this.http.get(this.apiURL);
  }

  getEnrollmentsByStudentId(studentId: string) {
    return this.http.get(`${this.apiURL}?studentId=${studentId}`);
  }

  checkEnrollment(studentId: string, courseId: string) {
    return this.http.get(`${this.apiURL}?studentId=${studentId}&courseId=${courseId}`);
  }
}