import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiAssignment } from '../api-assignment';
import { ApiSubmission } from '../api-submission';
import { Auth } from '../../../core/services/auth';
import { Location } from '@angular/common';

@Component({
  selector: 'app-submit-assignment',
  standalone: false, 
  templateUrl: './submit-assignment.html',
  styleUrls: ['./submit-assignment.css']
})
export class SubmitAssignment implements OnInit {
  assignmentId: string | null = null;
  assignment: any = {};
  submitForm!: FormGroup;
  studentData: any;

  constructor(
    private route: ActivatedRoute,
    private _apiAssignment: ApiAssignment,
    private _apiSubmission: ApiSubmission,
    private fb: FormBuilder,
    private _auth: Auth,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.assignmentId = this.route.snapshot.paramMap.get('id');
    this.studentData = this._auth.getUserPayload();

    this.submitForm = this.fb.group({
      answerLink: ['', [Validators.required, Validators.pattern('https?://.+')]] 
    });

    if (this.assignmentId) {
      this._apiAssignment.getAssignmentById(this.assignmentId).subscribe({
        next: (res) => {
          this.assignment = res;
        },
        error: (err) => console.error(err)
      });
    }
  }

  onSubmit() {
    if (this.submitForm.valid && this.assignmentId) {
      const submissionData = {
        courseId: this.assignment.courseId,
        assignmentId: this.assignmentId,
        studentId: this.studentData.id,
        studentName: this.studentData.fullname || this.studentData.username,
        submissionDate: new Date().toISOString().split('T')[0], 
        answer: this.submitForm.value.answerLink,
        status: 'pending',
        grade: null,
        feedback: ''
      };

      this._apiSubmission.submitAssignment(submissionData).subscribe({
        next: () => {
          alert('Assignment submitted successfully!');
          this.location.back();
        },
        error: (err) => console.error(err)
      });
    } else {
      this.submitForm.markAllAsTouched();
    }
  }

  cancel() {
    this.location.back();
  }
}