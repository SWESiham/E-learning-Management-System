import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing-module';
import { MyCourses } from './components/my-courses/my-courses';
import { CourseDetails } from './components/course-details/course-details';
import { CourseContent } from './components/course-content/course-content';
import { CourseResources } from './components/course-resources/course-resources';
import { CatalogCourses } from './components/catalog-courses/catalog-courses';


@NgModule({
  declarations: [
    MyCourses,
    CourseDetails,
    CourseContent,
    CourseResources,
    CatalogCourses
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class StudentModule { }
