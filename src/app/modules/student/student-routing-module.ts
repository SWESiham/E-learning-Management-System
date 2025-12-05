import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyCourses } from './components/my-courses/my-courses';
import { CourseDetails } from './components/course-details/course-details';
import { CatalogCourses } from './components/catalog-courses/catalog-courses';
const routes: Routes = [
  { path: 'my-courses', component: MyCourses},
  { path: 'catalogCourses', component: CatalogCourses },
  { path: 'course/:id', component: CourseDetails, children: [{ path: 'assignments', loadChildren: () => import('../assignment/assignment-module').then(m => m.AssignmentModule) }] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }

