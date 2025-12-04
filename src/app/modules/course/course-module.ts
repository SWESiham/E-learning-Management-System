import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCourse } from './create-course/create-course';
import { EditCourse } from './edit-course/edit-course';
import { CourseRoutingModule } from './course-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { GetInstructorCourses } from './get-instructor-courses/get-instructor-courses';
import { InstructorCourseDetails } from './instructor-course-details/instructor-course-details';

@NgModule({
  declarations: [
    CreateCourse,
    EditCourse,

    GetInstructorCourses,
    InstructorCourseDetails,

  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule,
    ToastrModule,
    ReactiveFormsModule
  ]
})
export class CourseModule { }
