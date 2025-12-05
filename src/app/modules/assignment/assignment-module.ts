import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentRoutingModule } from './assignment-routing-module'; 
import { CreateAssignment } from './create-assignment/create-assignment';
import { EditAssignment } from './edit-assignment/edit-assignment';
import { SubmitAssignment } from './submit-assignment/submit-assignment';
import { ViewSubmition } from './view-submition/view-submition';
import { GradeAssignment } from './grade-assignment/grade-assignment';
import { StudentAssignment } from './student-assignment/student-assignment';
import { GetAssignment } from './get-assignment/get-assignment';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateAssignment,
    EditAssignment,
    SubmitAssignment,
    ViewSubmition,
    GradeAssignment,
    StudentAssignment,
    GetAssignment
  ],
  imports: [
    CommonModule,
    AssignmentRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    GetAssignment
  ]
})
export class AssignmentModule { }
