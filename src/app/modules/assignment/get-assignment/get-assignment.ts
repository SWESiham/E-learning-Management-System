import { Component, OnInit } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAssignment } from '../api-assignment';
import { Auth } from '../../../core/services/auth';
import { ApiSubmission } from '../api-submission';

@Component({
  selector: 'app-get-assignment',
  standalone: false,
  templateUrl: './get-assignment.html',
  styleUrl: './get-assignment.css',
})
export class GetAssignment implements OnInit {
  assignments: any[] = [];
  courseId: string | null = null;
  userRole: string = '';
  userId: string = '';

  constructor(
    private route: ActivatedRoute, 
    private _apiAssignments: ApiAssignment,
    private router: Router,
    private _auth: Auth,
    private _apiSubmission: ApiSubmission
  ) {}

  ngOnInit() {
this.courseId = this.route.parent?.snapshot.paramMap.get('id') 
                 || this.route.parent?.parent?.snapshot.paramMap.get('id') 
                 || null;
    const payload = this._auth.getUserPayload();
    this.userRole = payload.role;
    this.userId = payload.id;
    this.loadData();

  }

loadData() {
    this._apiAssignments.getAssignmentsByCourseId(this.courseId!).subscribe({
      next: (res: any) => {
        this.assignments = res;
            console.log("Loaded Course Id",this.courseId);

        if (this.userRole === 'Student' && this.userId) {
          console.log("Checking student submissions for user:", this.userId);
          this.checkStudentSubmissions();
        }
      },
      error: (err) => console.error(err)
    });
  }

  checkStudentSubmissions() {
    this._apiSubmission.getStudentSubmissions(this.userId, this.courseId!).subscribe({
      next: (submissions: any[]) => {
        this.assignments.forEach(assignment => {
          const submission = submissions.find(sub => sub.assignmentId === assignment.id);
          if (submission) {
            assignment.isSubmitted = true;
            assignment.studentGrade = submission.grade;
            assignment.submissionId = submission.id;
          } else {
            assignment.isSubmitted = false;
          }
        });
      },
      error: (err) => console.error('Error fetching submissions', err)
    });
  }

  navigateToCreate() {
    if(this._auth.getUserRole() !== 'Instructor') {
      alert('You do not have permission.');
      return;
    }
    this.router.navigate(['assignments/create'], { 
      queryParams: { courseId: this.courseId } 
    });
  }

  navigateToEdit(assignmentId: string) {
    if(this._auth.getUserRole() !== 'Instructor') {
      alert('You do not have permission.');
      return;
    }
    this.router.navigate(['assignments', 'edit', assignmentId]);
  }

  Delete(assignmentId: string) {
    if(this._auth.getUserRole() !== 'Instructor') {
      alert('You do not have permission.');
      return;
    }
    if (confirm('Are you sure you want to delete this assignment?')) {
        this._apiAssignments.deleteAssignment(assignmentId).subscribe({
          next: () => {
            console.log('Assignment deleted successfully');
            this.loadData(); 
          },
          error: (err) => {
            console.error('Error deleting assignment', err);
            alert('Failed to delete assignment');
          }
        });
    }
  }

  navigateToSolve(assignmentId: string) {
    if(this._auth.getUserRole() == 'Student') {
      this.router.navigate(['assignments', 'submit', assignmentId]);
    }
  }

  navigateToViewSubmission(assignmentId: string) {
    if(this._auth.getUserRole() == 'Student') {
    this.router.navigate(['assignments', 'view', assignmentId]);

    }
  } 
}