import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashborad } from './components/admin-dashborad/admin-dashborad';
import { AdminEnrollement } from './components/admin-enrollement/admin-enrollement';
import { AdminCourseCataolg } from './components/admin-course-cataolg/admin-course-cataolg';
import { ViewCourses } from './components/view-courses/view-courses';

const routes: Routes = [
  { path: '', component: AdminDashborad },
  { path: 'enrollement', component: AdminEnrollement },
  {path :'coursecatalog',component:AdminCourseCataolg},
  {path:'viewcourse/:id',component:ViewCourses}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
