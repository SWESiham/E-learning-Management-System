import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Profile } from './shared/components/profile/profile';
import { InstructorModule } from './modules/instructor/instructor-module';
import { adminGuard } from './core/guards/admin-guard';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./modules/home/home-module').then(m => m.HomeModule)
  },

  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'course',
    loadChildren: () => import('./modules/course/course-module').then(m => m.CourseModule)
  },
  {
    path: 'instructor',
    loadChildren: () => import('./modules/instructor/instructor-module').then(m => m.InstructorModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./modules/student/student-module').then(m => m.StudentModule)
  },
  {
    path: 'profile/:id',
    component: Profile
  },
  {
    path: 'profile',
    component: Profile
  },
  { 
    path: 'assignments', loadChildren: () => import('./modules/assignment/assignment-module').then(m => m.AssignmentModule) 
  },
  {
    path: 'admin',
    canActivate:[adminGuard],
    loadChildren: () => import('./modules/admin/admin-module').then(m => m.AdminModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

