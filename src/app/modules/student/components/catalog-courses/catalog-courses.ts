import { Component, Input } from '@angular/core';
import { Auth } from '../../../../core/services/auth';
import { ApiCourse } from '../../../../core/services/api-course';
import { categories } from '../../../../core/models/categories';

@Component({
  selector: 'app-catalog-courses-student',
  standalone: false,
  templateUrl: './catalog-courses.html',
  styleUrl: './catalog-courses.css',
})
export class CatalogCourses {
  searchCourse: string = ''
  isActiveAll = true;
  isActiveCategory: any = {};
  categories = categories;
  enrolled: boolean = false;
  constructor(private _auth: Auth, private _apiCourse: ApiCourse) { }
  courses: any[] = []
  @Input()isAdmin: boolean = false;
  ngOnInit(): void {
    this._apiCourse.getCourses().subscribe((res: any) => {
      this.courses = res;
      this.courses = this.courses.filter(c => !c.isArchived);
      console.log("this.courses", this.courses);
    // const user = this._auth.getUserPayload();
    //   if (user && user.id) {
    //     this._apiCourse.getEnrollmentsByUserId(user.id).subscribe((enrollments: any) => {
          
    //       this.courses.forEach(course => {
      
    //         const isEnrolled = enrollments.some((e: any) => e.courseId === course.id);
           
    //         course.isEnrolled = isEnrolled; 
    //       });

    //     });
    //   }
    
    })
  }
  coursesFilter(category: string) {
    this.isActiveAll = category === 'All';
    this.isActiveCategory = {};
    if (category !== 'All') {
      this.isActiveCategory[category] = true;
    }
    if (category === 'All') this.ngOnInit();
    else {
      this._apiCourse.getCoursesByCategory(category).subscribe((res: any) => {
        this.courses = res;
        this.courses = this.courses.filter(c => !c.isArchived);
        console.log("this.courses", this.courses);

      })
    }
  }
  searchCourses() {
    this._apiCourse.getCourses().subscribe((res: any) => {
      this.courses = res.filter((course: any) => course.title.toLowerCase().includes(this.searchCourse.toLowerCase()));
      console.log("this.courses", this.courses);
    })
  }
  enrollNow(courseId: string, event: Event) {
    event.stopPropagation();
    console.log("Enrolling in course with ID:", courseId);
    const user = this._auth.getUserPayload();
    const studentId = user['id'];
    const enrollmentData = {
      studentId: studentId,
      courseId: courseId,
      progress: 0
    }
    this._apiCourse.enrollInCourse(enrollmentData).subscribe({
      next: (res) => {
        alert('Enrolled successfully!');
        const selectedCourse = this.courses.find(c => c.id === courseId);
        if (selectedCourse) {
          selectedCourse.isEnrolled = true;
        }
      },
      error: (err) => {
        console.error('Enrollment failed:', err);
      }
    });
  }

  deleteCourse(id:string){ 
  this._apiCourse.deleteCourse(id).subscribe(() => {
    this.courses = this.courses.filter(c => c.id !== id);
  });
  }
}