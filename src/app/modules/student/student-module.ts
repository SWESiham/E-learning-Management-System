import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing-module';
import { MyCourses } from './components/my-courses/my-courses';
import { CourseDetails } from './components/course-details/course-details';
import { AssignmentPlayer } from './components/assignment-player/assignment-player';


@NgModule({
  declarations: [
    MyCourses,
    CourseDetails,
    AssignmentPlayer
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
