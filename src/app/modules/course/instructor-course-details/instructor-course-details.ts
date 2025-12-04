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
  role:string="normal";
  activebutton:boolean=true
  payload:any
  courseT:any
 constructor(private route: ActivatedRoute,private _auth: Auth,private _router: Router,private _apiCourse: ApiCourse) {}
  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
    const payload= this._auth.getUserPayload()
    this.payload=payload
     this._apiCourse.getCourse(id!).subscribe((res) => {
      this.courseT=res
      if(payload&&this._auth.isLoggedInWithRole('Instructor')){
        console.log("res", res);
      if(this.courseT.authorId===payload.id){
        this.role="Instructor"
      }
  }
      else
      {
        this._router.navigate(['/auth/login'])
      }
      this.course = this.courseT;
      console.log("this.course", this.course);
    });
  

   
  }
  setactivebuttom(value:boolean){
    this.activebutton=value
  }
  convertToHours(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if(hours === 0) {
      return `${remainingMinutes} : 00`;
    }
    return `${hours} : ${remainingMinutes} : 00`;
  }
  getnickName(name:string)
  {
    const firstName = name.split(" ")[0]
    const secondName = name.split(" ")[1]
    console.log("firstName[0][0]+secondName[0][0]", firstName[0][0]+secondName[0][0]);
    return firstName[0][0]+secondName[0][0]
  }
  navigateToEditCourses() {
    this._router.navigate(['/course/instructorCourses/edit', this.course.id]);
  }
  deleteCourse() {
    this._apiCourse.deleteCourse(this.course.id).subscribe(() => {
      this._router.navigate(['/course/instructorCourses']);
    });
  }
  
}

