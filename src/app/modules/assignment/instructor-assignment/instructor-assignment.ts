import { Component, OnInit } from '@angular/core'; // شيلنا Input مش مستخدم
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAssignment } from '../api-assignment';
// شيلنا import Location لأنه مش الطريقة الصح هنا

@Component({
  selector: 'app-instructor-assignment',
  standalone: false,
  templateUrl: './instructor-assignment.html',
  styleUrl: './instructor-assignment.css',
})
export class InstructorAssignment implements OnInit {
  assignments: any[] = [];
  courseId: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private _apiAssignments: ApiAssignment,
    private router: Router
  ) {}

  ngOnInit() {
    this.courseId = this.route.parent?.snapshot.paramMap.get('id') || null;
    this.loadAssignments();
  }

  loadAssignments() {
    if (this.courseId) {
      this._apiAssignments.getAssignmentsByCourseId(this.courseId).subscribe({
        next: (res: any) => {
          this.assignments = res;
          console.log('Assignments loaded:', this.assignments);
        },
        error: (err) => console.error(err)
      });
    }
  }

  navigateToCreate() {
    this.router.navigate(['assignments/create'], { 
      queryParams: { courseId: this.courseId } 
    });
  }

  navigateToEdit(assignmentId: string) {
    this.router.navigate(['assignments', 'edit', assignmentId]);
  }

  Delete(assignmentId: string) {
    if (confirm('Are you sure you want to delete this assignment?')) {
        this._apiAssignments.deleteAssignment(assignmentId).subscribe({
          next: () => {
            console.log('Assignment deleted successfully');
            this.loadAssignments(); 
          },
          error: (err) => {
            console.error('Error deleting assignment', err);
            alert('Failed to delete assignment');
          }
        });
    }
  }
}