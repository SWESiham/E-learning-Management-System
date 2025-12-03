import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiAssignment } from '../api-assignment';
import { assignment } from '../../../core/models/assignment';

@Component({
  selector: 'app-instructor-assignment',
  standalone: false,
  templateUrl: './instructor-assignment.html',
  styleUrl: './instructor-assignment.css',
})
export class InstructorAssignment implements OnInit {
  assignments: assignment[] = [];
  courseId: string | null = null;

    constructor(private route: ActivatedRoute, private apiAssignment: ApiAssignment) {}

  ngOnInit(): void {
    this.courseId = this.route.parent!.snapshot.paramMap.get('id');
    console.log('Course ID:', this.courseId);

    if (this.courseId) {
      this.apiAssignment.getAssignmentsByCourseId(this.courseId).subscribe((data) => {
        this.assignments = data;
        console.log('Assignments:', this.assignments);
      });
    } else {
      console.error('Course ID is null or undefined');
    }
  }


}
