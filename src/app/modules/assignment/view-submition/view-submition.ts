import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiSubmission } from '../api-submission';
import { ApiAssignment } from '../api-assignment'; // لجلب عنوان الاسايمنت
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-submition',
  standalone: false,
  templateUrl: './view-submition.html',
  styleUrls: ['./view-submition.css']
})
export class ViewSubmition implements OnInit {
  submission: any = {};
  assignment: any = {};
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private _apiSubmission: ApiSubmission,
    private _apiAssignment: ApiAssignment,
    public location: Location
  ) {}

  ngOnInit(): void {
    const submissionId = this.route.snapshot.paramMap.get('id');

    if (submissionId) {
      this._apiSubmission.getSubmissionById(submissionId).subscribe({
        next: (subRes) => {
          this.submission = subRes;
          
          if(this.submission.assignmentId) {
             this._apiAssignment.getAssignmentById(this.submission.assignmentId).subscribe(assRes => {
                 this.assignment = assRes;
                 this.isLoading = false;
             });
          } else {
             this.isLoading = false;
          }
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
    }
  }
}