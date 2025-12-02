import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAssignment } from './create-assignment/create-assignment';
import { EditAssignment } from './edit-assignment/edit-assignment';
import { DeleteAssignment } from './delete-assignment/delete-assignment';
import { SubmitAssignment } from './submit-assignment/submit-assignment';
import { ViewSubmition } from './view-submition/view-submition';
import { GradeAssignment } from './grade-assignment/grade-assignment';
import { InstructorAssignment } from './instructor-assignment/instructor-assignment';
const routes: Routes = [
  { path: 'course/:id/assignments/', component: InstructorAssignment },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmentRoutingModule {}