import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCourse {
   apiURL = 'http://localhost:3000/courses';
  constructor(private http: HttpClient) { }
  saveCourse(data: any) {
    return this.http.post(this.apiURL, data);
  }
     getCoursesCount(): Observable<number> {
    return this.http.get<number>(this.apiURL).pipe(
      map((response: any) => response.length)
    );
  }
   getCourse(id: string) {
    return this.http.get(`${this.apiURL}/${id}`);
  }
  getCourses() {
    return this.http.get(this.apiURL);
  }
  getCousreByInstructorId(id: string) {
    const courses=this.getCourses().pipe(map((res: any) => res.filter((course: any) =>course.authorId === id)));
    console.log("APIcourses", courses);
    return courses
  }
  editCourse(id: string, course: any) {
    return this.http.patch(`${this.apiURL}/${id}`, course);
  }
  deleteCourse(id: string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
  getCoursesByCategory(category: string) {
    return this.http.get(`${this.apiURL}?category=${category}`);
  }
  getEnrollmentsByCourseId(courseId: string) {
    
    return this.http.get(`http://localhost:3000/enrollments?courseId=${courseId}`);
  }

  ArchiveCourse(id: string) {
    return this.http.patch(`${this.apiURL}/${id}`, { isArchived: true });
  }
  UnarchiveCourse(id: string) {
    return this.http.patch(`${this.apiURL}/${id}`, { isArchived: false });
  }

}
