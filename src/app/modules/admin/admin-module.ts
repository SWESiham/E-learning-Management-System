import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing-module';
import { AdminDashborad } from './components/admin-dashborad/admin-dashborad';
import { SharedModule } from '../../shared/shared-module';
import { HttpClientModule } from '@angular/common/http';
import { AdminEnrollement } from './components/admin-enrollement/admin-enrollement';
import { AdminCourseCataolg } from './components/admin-course-cataolg/admin-course-cataolg';
import { CourseModule } from '../course/course-module';
import { ViewCourses } from './components/view-courses/view-courses';
import { StudentModule } from '../student/student-module';

@NgModule({
  declarations: [AdminDashborad, AdminEnrollement, AdminCourseCataolg, ViewCourses],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    CourseModule,
    StudentModule
  ],
})
export class AdminModule {}
