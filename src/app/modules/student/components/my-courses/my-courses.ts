import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../../core/services/auth';
import { ApiCourse } from '../../../../core/services/api-course';
import { StudentService } from '../../../../core/services/student-service';

@Component({
  selector: 'app-my-courses',
  standalone: false,
  templateUrl: './my-courses.html',
  styleUrls: ['./my-courses.css']
})
export class MyCourses implements OnInit {
  constructor(private _auth: Auth, private _studentService: StudentService) { }
  userId: string = "0";
  userName: string = "";
  enrollments: any[] = [];
  courses: any[] = [];
  ngOnInit(): void {
    const user = this._auth.getUserPayload();
    console.log("coursessss id : " + user['id']);
    console.log("student userame : " + user['fullname']);
    this.userId = user['id'];
    this.userName = user['fullname'];
    console.log(this.userName);
    this.loadCourses();
  }
  loadCourses(): void {
    this._studentService.getStudeEnrollments(this.userId).subscribe((res) => {
      this.enrollments = res as any[];
      console.log(this.enrollments);
      this.enrollments.forEach(enrollment => {
        this._studentService.getCourseById(enrollment.courseId).subscribe((courseRes) => {
          const combinedData = {
            ...courseRes,
            progress: enrollment.progress,
            enrollmentId: enrollment.id
          };
          this.courses.push(combinedData);
          console.log("Course Details: ", this.courses);
        });
      });
    });
  }
}