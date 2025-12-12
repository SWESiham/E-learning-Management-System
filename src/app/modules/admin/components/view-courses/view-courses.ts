import { Component, OnInit } from '@angular/core';
import { ApiCourse } from '../../../course/api-course';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../../core/services/student-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-courses',
  standalone: false,
  templateUrl: './view-courses.html',
  styleUrl: './view-courses.css',
})
export class ViewCourses implements OnInit {
  courseId!: string;
  courseData: any;
  enrollments: any;
  students: any;
  activeTab: string = 'content';

  constructor(
    private _api: ApiCourse,
    private route: ActivatedRoute,
    private studentService: StudentService
    ,private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.loadCourseDetails();
  }

  loadCourseDetails(): void {
    this._api.getCourse(this.courseId).subscribe((data: any) => {
      this.courseData = data;
      console.log("this.courseData,", this.courseData);
    });

    this._api.getEnrollmentsByCourseId(this.courseId).subscribe((data: any) => {
      this.enrollments = data;
      console.log('Enrollments for this course:', data);
    });

  this.studentService.getStudents().subscribe((students: any) => {
  this.enrollments = this.enrollments.map((enroll: any) => {
    const student = students.find((s: any) => s.id === enroll.studentId);
    return { ...enroll, studentName: student?.username };
  });
});
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
  navigateToEditCourses() {
    this.router.navigate(['/course/instructorCourses/edit', this.courseId]);
  }

}
