import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-course-cataolg',
  standalone: false,
  templateUrl: './admin-course-cataolg.html',
  styleUrl: './admin-course-cataolg.css',
})
export class AdminCourseCataolg {

  constructor(private _router: Router) { }
  navigateToCreateCourse() {
  
    this._router.navigate(['course/create']);
  }
}
