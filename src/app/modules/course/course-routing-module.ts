import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCourse } from './create-course/create-course';
import { EditCourse } from './edit-course/edit-course';
import { GetInstructorCourses } from './get-instructor-courses/get-instructor-courses';
import { CatalogCourses } from './catalog-courses/catalog-courses';
import { InstructorCourseDetails } from './instructor-course-details/instructor-course-details';
import { InstructorAssignment } from '../assignment/instructor-assignment/instructor-assignment';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },

  { path: 'create', component: CreateCourse },
  { path: 'courses', component: GetInstructorCourses },
  { path: 'courses/:id', component: InstructorCourseDetails, children: [{ path: 'assignments', component: InstructorAssignment }]},
  { path: 'catalogCourses', component: CatalogCourses },
  { path: 'edit/:id', component: EditCourse },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule {}
