import { Component } from '@angular/core';
import { ApiCourse } from '../../../course/api-course';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-course-resources',
  standalone: false,
  templateUrl: './course-resources.html',
  styleUrl: './course-resources.css',
})
export class CourseResources {
  constructor(private apiCourseService: ApiCourse, private _http: HttpClient) { }
  
  resources: any[] = [];
  courses: any[] = [];

  ngOnInit() {
    const userId = localStorage.getItem('userId') || '';
    this.apiCourseService.getCourse(userId).subscribe((data: any) => {
      this.courses = data;
      this.courses.filter((course: any) => {
        this.resources = course.resourse;
        console.log(this.resources);
      });
    });
  }


}
