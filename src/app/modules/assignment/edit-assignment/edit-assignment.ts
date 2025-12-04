import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAssignment } from '../api-assignment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-assignment',
  standalone: false,
  templateUrl: './edit-assignment.html',
  styleUrl: './edit-assignment.css',
})
export class EditAssignment implements OnInit {
  editForm!: FormGroup;
  assignmentId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _apiAssignment: ApiAssignment,
    private location: Location
  ) {}

  ngOnInit() {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      assignmentLink: ['', Validators.required],
      dueDate: ['', Validators.required],
    });

    this.assignmentId = this.route.snapshot.paramMap.get('id');

    if (this.assignmentId) {
      this._apiAssignment.getAssignmentById(this.assignmentId).subscribe({
        next: (res: any) => {
          if(res.dueDate) {
             res.dueDate = res.dueDate.split('T')[0]; 
          }
          this.editForm.patchValue(res);
        },
        error: (err) => console.error('Error fetching assignment', err)
      });
    }
  }

  onSubmit() {
    if (this.editForm.valid && this.assignmentId) {
      this._apiAssignment.editAssignment(this.assignmentId, this.editForm.value).subscribe({
        next: () => {
          console.log('Assignment Updated');
          this.goBack(); 
        },
        error: (err) => console.error('Error updating assignment', err)
      });
    } else {
      this.editForm.markAllAsTouched();
    }
  }

  goBack() {
    this.location.back();
  }
}