import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAssignment } from './create-assignment/create-assignment';
import { EditAssignment } from './edit-assignment/edit-assignment';
import { SubmitAssignment } from './submit-assignment/submit-assignment';
import { ViewSubmition } from './view-submition/view-submition';
import { GradeAssignment } from './grade-assignment/grade-assignment';
import { GetAssignment } from './get-assignment/get-assignment';

const routes: Routes = [
{ path: '', component: GetAssignment },
  { path: 'create', component: CreateAssignment },
  { path: 'edit/:id', component: EditAssignment },
  { path: 'submit/:id', component: SubmitAssignment },
  { path: 'view/:id', component: ViewSubmition },
  { path: 'grade/:id', component: GradeAssignment },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignmentRoutingModule {}