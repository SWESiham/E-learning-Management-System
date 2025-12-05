import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCourse } from '../api-course';

@Component({
  selector: 'app-instructor-course-details',
  standalone: false,
  templateUrl: './instructor-course-details.html',
  styleUrl: './instructor-course-details.css',
})
export class InstructorCourseDetails implements OnInit {
  course: any = {};
  role: string = "normal";
  activebutton: boolean = true; 
  payload: any;

  constructor(
    private route: ActivatedRoute,
    private _auth: Auth,
    public _router: Router,
    private _apiCourse: ApiCourse
  ) {} 

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.payload = this._auth.getUserPayload();
    
      this._apiCourse.getCourse(id!).subscribe({
        next: (res: any) => {
          this.course = res;
          console.log("Course loaded:", this.course);

          if (this.payload && this._auth.isLoggedInWithRole('Instructor')) {
            if (this.course.authorId?.value === this.payload.id) {
              this.role = "Instructor";
            }
          }
        },
        error: (err) => {
          console.error("Error loading course:", err);
          this._router.navigate(['/auth/login']); 
        }
      });
    
    if (this._router.url.includes('assignments')) {
      this.activebutton = false;
    }
  }

  setactivebuttom(value: boolean) {
    this.activebutton = value;
  }

  convertToHours(minutes: number): string {
    if (!minutes) return '0 : 00'; 
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours === 0) {
      return `${remainingMinutes} : 00`;
    }
    return `${hours} : ${remainingMinutes} : 00`;
  }

  getnickName(name: any) { 
     const fullName = typeof name === 'object' ? name.value : name;
     if(!fullName) return 'NA';
     
     const parts = fullName.split(" ");
     if(parts.length >= 2) {
         return (parts[0][0] + parts[1][0]).toUpperCase();
     }
     return parts[0][0].toUpperCase();
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



  

