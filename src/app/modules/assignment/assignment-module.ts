import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentRoutingModule } from './assignment-routing-module'; 
import { CreateAssignment } from './create-assignment/create-assignment';
import { EditAssignment } from './edit-assignment/edit-assignment';
import { DeleteAssignment } from './delete-assignment/delete-assignment';
import { SubmitAssignment } from './submit-assignment/submit-assignment';
import { ViewSubmition } from './view-submition/view-submition';
import { GradeAssignment } from './grade-assignment/grade-assignment';
import { StudentAssignment } from './student-assignment/student-assignment';
import { InstructorAssignment } from './instructor-assignment/instructor-assignment';



@NgModule({
  declarations: [
    CreateAssignment,
    EditAssignment,
    DeleteAssignment,
    SubmitAssignment,
    ViewSubmition,
    GradeAssignment,
    StudentAssignment,
    InstructorAssignment
  ],
  imports: [
    CommonModule,
    AssignmentRoutingModule
  ],
  exports: [
    InstructorAssignment
  ]
})
export class AssignmentModule { }
