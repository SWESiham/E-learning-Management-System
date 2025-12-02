import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'student',
    loadChildren: () => import('./modules/student/student-module').then(m => m.StudentModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }