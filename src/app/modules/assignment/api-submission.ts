import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiSubmission {
  apiURL = 'http://localhost:3000/submissions';

  constructor(private http: HttpClient) {}

  getStudentSubmissions(studentId: string, courseId: string) {
    return this.http.get<any[]>(`${this.apiURL}?studentId=${studentId}&courseId=${courseId}`);
  }

  submitAssignment(data: any) {
    return this.http.post(this.apiURL, data);
  }
  getSubmissionById(submissionId: string) {
    return this.http.get<any>(`${this.apiURL}/${submissionId}`);
  }

}