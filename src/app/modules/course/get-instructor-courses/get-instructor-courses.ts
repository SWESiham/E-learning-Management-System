import { Component } from '@angular/core';
import { ApiCourse } from '../api-course';

import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-instructor-courses',
  standalone: false,
  templateUrl: './get-instructor-courses.html',
  styleUrl: './get-instructor-courses.css',
})
export class GetInstructorCourses {
  constructor(private _auth: Auth, private _course: ApiCourse,private _router: Router) { }
  courses: any[] = [];
  instructorName:string='';
  ngOnInit() {
    const getUserPayload = this._auth.getUserPayload();
    this.instructorName=getUserPayload.username
    if(getUserPayload&&this._auth.isLoggedInWithRole('Instructor')){
    this._course.getCousreByInstructorId(getUserPayload.id).subscribe((res: any) => {
      this.courses = res;
      
      console.log("this.courses", this.courses);
      
    })
  }

  }
  navigateToCreateCourse() {
    
    this._router.navigate(['course/create']);
  }

  navigateToCourseDetails(id: number) {
    this._router.navigate(['course/instructorCourses', id]);
  }


}
