import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'course',
    loadChildren: () => import('./modules/course/course-module').then(m => m.CourseModule)
  },
  { 
    path: 'assignment', loadChildren: () => import('./modules/assignment/assignment-module').then(m => m.AssignmentModule) 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
