import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { assignment } from '../../core/models/assignment';

@Injectable({
  providedIn: 'root',
})
export class ApiAssignment {
  apiURL = 'http://localhost:3000/assignments';

  constructor(private http: HttpClient) {}
  getAssignments() {
    return this.http.get(this.apiURL);
  }
  getAssignmentsByCourseId(courseId: string) {
    return this.http.get(`${this.apiURL}?courseId=${courseId}`);
  }
  getAssignmentById(assignmentId: string) {
    return this.http.get(`${this.apiURL}/${assignmentId}`);
  }

  createAssignment(data: assignment) {
    return this.http.post(this.apiURL, data);
  }
  editAssignment(assignmentId: string, data: assignment) {
    return this.http.put(`${this.apiURL}/${assignmentId}`, data);
  }
  deleteAssignment(assignmentId: string) {
    return this.http.delete(`${this.apiURL}/${assignmentId}`);
  }
  getSubmissionsByAssignmentId(assignmentId: string): Observable<any> {
    return this.http.get(`${this.apiURL}/${assignmentId}/submissions`);
  }
  getSubmission(assignmentId: string, studentId: string): Observable<any> {
    return this.http.get(
      `${this.apiURL}/${assignmentId}/submissions?studentId=${studentId}`
    );
  }
  
}
