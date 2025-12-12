import { Component, Input } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { ApiCourse } from '../api-course';
import { categories } from '../../../core/models/categories';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-catalog-courses',
  standalone: false,
  templateUrl: './catalog-courses.html',
  styleUrl: './catalog-courses.css',
})
export class CatalogCourses {
  @Input() isAdmin:boolean=false;
  searchCourse: string=''
  isActiveAll = true;
  isActiveCategory: any = {};
  categories= categories
  constructor(private _auth: Auth,private _apiCourse: ApiCourse, private _router: Router) { }
  courses: any[] = []
   ngOnInit(): void {
     this._apiCourse.getCourses().subscribe((res: any) => {
       this.courses = res;
       console.log("this.courses", this.courses);
       
     })
   }
   coursesFilter(category: string) {
    this.isActiveAll = category === 'All';
    this.isActiveCategory = {};
    if (category !== 'All') {
      this.isActiveCategory[category] = true;
    }
    if(category === 'All') this.ngOnInit();
    else{
    this._apiCourse.getCoursesByCategory(category).subscribe((res: any) => {
      this.courses = res;
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
 deleteCourse(id:string){ 
  this._apiCourse.deleteCourse(id).subscribe(() => {
    this.courses = this.courses.filter(c => c.id !== id);
  });
  }

   navigateToCreateCourse() {
    this._router.navigate(['course/create'],
  { queryParams: { isAdmin: this.isAdmin } });
  }

}
