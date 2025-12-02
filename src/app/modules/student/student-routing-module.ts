import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCourses } from './components/my-courses/my-courses';
import { CourseDetails } from './components/course-details/course-details';
const routes: Routes = [
  { path: 'my-courses', component: MyCourses },
  { path: 'course/:id', component: CourseDetails }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }