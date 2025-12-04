import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCourse } from '../api-course';
import { ApiAssignment } from '../../assignment/api-assignment';

@Component({
  selector: 'app-instructor-course-details',
  standalone: false,
  templateUrl: './instructor-course-details.html',
  styleUrl: './instructor-course-details.css',
})
export class InstructorCourseDetails {
  course: any = {};
  role:string="normal"
 constructor(private route: ActivatedRoute,private _auth: Auth, public _router: Router,private _apiCourse: ApiCourse, private _apiAssignments: ApiAssignment) {}
  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
    const payload= this._auth.getUserPayload()
     this._apiCourse.getCourse(id!).subscribe((res) => {
      this.course = res;
      
      console.log('Course object:', this.course.id); 
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
