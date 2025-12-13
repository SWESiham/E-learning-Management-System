import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private _http: HttpClient) { }

  apiURL = 'http://localhost:3000';


  getStudents(){
    return this._http.get(`${this.apiURL}/users?role=Student`);
  }
   getStudentById(studentId: string) {
    return this._http.get(`${this.apiURL}/users/${studentId}`);
  }
  getStudeEnrollments(studentId: string) {
    return this._http.get(`${this.apiURL}/enrollments?studentId=${studentId}`);
  }

  getCourseById(courseId: string) {
    return this._http.get(`${this.apiURL}/courses/${courseId}`);
  }
  updateEnrollment(id: string, data: any) {
  return this._http.put(`${this.apiURL}/enrollments/${id}`, data);
  }
  updateCourseMaterialStatus(id: string, data: any) {
      return this._http.put(`${this.apiURL}/courses/${id}`, data);
  }
}

