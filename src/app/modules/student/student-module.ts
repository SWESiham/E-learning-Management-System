import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentRoutingModule } from './student-routing-module';
import { MyCourses } from './components/my-courses/my-courses';
import { CourseDetails } from './components/course-details/course-details';
import { AssignmentPlayer } from './components/assignment-player/assignment-player';
import { CourseContent } from './components/course-content/course-content';
import { AssignmentList } from './components/assignment-list/assignment-list';
import { CourseResources } from './components/course-resources/course-resources';
import { AssignmentStart } from './components/assignment-start/assignment-start';


@NgModule({
  declarations: [
    MyCourses,
    CourseDetails,
    AssignmentPlayer,
    CourseContent,
    AssignmentList,
    CourseResources,
    AssignmentStart
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule
  ]
})
export class StudentModule { }
