import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCourse } from '../api-course';

@Component({
  selector: 'app-instructor-course-details',
  standalone: false,
  templateUrl: './instructor-course-details.html',
  styleUrl: './instructor-course-details.css',
})
export class InstructorCourseDetails {
  course: any = {};
  role:string="normal"
 constructor(private route: ActivatedRoute,private _auth: Auth,private _router: Router,private _apiCourse: ApiCourse) {}
  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
    const payload= this._auth.getUserPayload()
     this._apiCourse.getCourse(id!).subscribe((res) => {
      this.course = res;
      if(payload&&this._auth.isLoggedInWithRole('instructor')){
        if(this.course.authorId.value==payload.id){
          this.role="instructor"
        }

  }
      else if(payload&&this._auth.isLoggedInWithRole('student')){
        if(payload.courses.includes(this.course.id)){
          this.role="student"
        }
   
  }
    });
}
}
