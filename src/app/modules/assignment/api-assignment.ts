import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { assignment } from '../../core/models/assignment';

@Injectable({
  providedIn: 'root',
})
export class ApiAssignment {
  apiURL = 'http://localhost:3000/course';

  constructor(private http: HttpClient) {}

  getAssignmentsByCourseId(courseId: string) {
    return this.http.get<assignment[]>(`${this.apiURL}/courses/${courseId}/assignments`);
  }
  getAssignmentById(courseId: string, assignmentId: string) {
    return this.http.get<assignment>(`${this.apiURL}/${courseId}/assignments/${assignmentId}`);
  }

  createAssignment(courseId: string, data: assignment) {
    return this.http.post<assignment>(`${this.apiURL}/${courseId}/assignments`, data);
  }
  updateAssignment(courseId: string, assignmentId: string, data: assignment) {
    return this.http.put<assignment>(`${this.apiURL}/${courseId}/assignments/${assignmentId}`, data);
  }
  deleteAssignment(courseId: string, assignmentId: string) {
    return this.http.delete(`${this.apiURL}/${courseId}/assignments/${assignmentId}`);
  }
  
}
