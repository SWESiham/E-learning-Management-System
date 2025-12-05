import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../core/services/auth';
import { ApiCourse } from '../../course/api-course';
import { ApiSubmission } from '../api-submission';
import { ApiAssignment } from '../api-assignment';

@Component({
  selector: 'app-grade-assignment',
  standalone: false,
  templateUrl: './grade-assignment.html',
  styleUrl: './grade-assignment.css',
})
export class GradeAssignment implements OnInit {
  instructorCourses: any[] = [];
  selectedCourseId: string | null = null;
  submissions: any[] = [];
  assignmentsMap: { [key: string]: string } = {}; 
  
  
  expandedSubmissionId: string | null = null; 
  

  gradeValue: number | null = null;
  feedbackValue: string = '';

  constructor(
    private _auth: Auth,
    private _apiCourse: ApiCourse,
    private _apiSubmission: ApiSubmission,
    private _apiAssignment: ApiAssignment
  ) {}


  ngOnInit() {
    const user = this._auth.getUserPayload();
    if (user && user.role === 'Instructor') {
      this._apiCourse.getCousreByInstructorId(user.id).subscribe({
        next: (res: any) => {
          this.instructorCourses = res;
          if (this.instructorCourses.length > 0) {
            this.selectCourse(this.instructorCourses[0].id);
          }
        }
      });
    }
  }

  selectCourse(courseId: string) {
    this.selectedCourseId = courseId;
    this.submissions = [];
    this.expandedSubmissionId = null; 
    
    this._apiAssignment.getAssignmentsByCourseId(courseId).subscribe((res: any) => {
      res.forEach((a: any) => {
        this.assignmentsMap[a.id] = a.title;
      });
      this.loadSubmissions(courseId);
    });
  }

  loadSubmissions(courseId: string) {
    this._apiSubmission.getSubmissionsByCourseId(courseId).subscribe({
      next: (res: any) => {
        this.submissions = res;
      },
      error: (err) => console.error(err)
    });
  }


  toggleExpand(submission: any) {
    if (this.expandedSubmissionId === submission.id) {

      this.closeExpand();
    } else {

      this.expandedSubmissionId = submission.id;
      this.gradeValue = submission.grade;
      this.feedbackValue = submission.feedback || '';
    }
  }


  saveGrade(submission: any) {
    const updateData = {
      ...submission, 
      grade: this.gradeValue,      
      feedback: this.feedbackValue,
      status: 'graded'             
    };

    this._apiSubmission.gradeSubmission(submission.id, updateData).subscribe({
      next: () => {
        alert('Graded Successfully');
        
        this.loadSubmissions(this.selectedCourseId!); 
      },
      error: (err) => alert('Error saving grade')
    });
    
  }

  closeExpand() {
    this.expandedSubmissionId = null;
    this.gradeValue = null;
    this.feedbackValue = '';
  }
}