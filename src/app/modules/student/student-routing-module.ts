import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCourses } from './components/my-courses/my-courses';
import { CourseDetails } from './components/course-details/course-details';
import { AssignmentStart } from './components/assignment-start/assignment-start';
import { AssignmentPlayer } from './components/assignment-player/assignment-player';
const routes: Routes = [
  { path: 'my-courses', component: MyCourses },
  { path: 'course/:id', component: CourseDetails },
  { path: 'assignment/start/:id', component: AssignmentStart },

  { path: 'assignment/quiz/:id', component: AssignmentPlayer }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }