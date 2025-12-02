import { Component } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { ApiCourse } from '../api-course';
import { categories } from '../../../core/models/categories';

@Component({
  selector: 'app-catalog-courses',
  standalone: false,
  templateUrl: './catalog-courses.html',
  styleUrl: './catalog-courses.css',
})
export class CatalogCourses {
  searchCourse: string=''
   isActiveAll = true;
  isActiveCategory: any = {};
  categories= categories
  constructor(private _auth: Auth,private _apiCourse: ApiCourse) { }
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
}
