import { Component, OnInit } from '@angular/core';
import { ApiCourse } from '../../../course/api-course';
import { UserService } from '../../../../core/services/user-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-enrollement',
  standalone: false,
  templateUrl: './admin-enrollement.html',
  styleUrl: './admin-enrollement.css',
})
export class AdminEnrollement implements OnInit {

  users: any[] = [];
  courses: any[] = [];
  enrollments: any[] = [];
  mergedData: any[] = [];
  studentsWithCourses: any[] = [];
  filteredUsers: any[] = [];
  students: any[] = [];
  totalInstructors: number = 0;
  showModal = false;
  selectedStudentId: any = null;
  selectedCourseId: any = null;
  enrollmentDate: string = '';
  totalEnrollments: number = 0;
  studentCount: number = 0;
  searchTerm: string = '';

  constructor(
    private _courseApi: ApiCourse,
    private _userApi: UserService,
    private http: HttpClient
  ) { }

  openModal() {
    this.showModal = true;
    this.selectedStudentId = null;
    this.selectedCourseId = null;
    this.enrollmentDate = '';
  }

  closeModal() {
    this.showModal = false;
  }

  getAvailableCourses() {
    if (!this.selectedStudentId) {
      return this.courses;
    }
    const studentEnrollments = this.enrollments.filter(e => e.studentId == this.selectedStudentId);
    const enrolledCourseIds = studentEnrollments.map(e => e.courseId);

    return this.courses.filter(course => !enrolledCourseIds.includes(course.id));
  }

  enrollStudent() {
    if (!this.selectedStudentId || !this.selectedCourseId || !this.enrollmentDate) return;

    const body = {
      studentId: this.selectedStudentId,
      courseId: this.selectedCourseId,
      progress: 0,
      enrollmentDate: this.enrollmentDate,
      isEnrolled: true
    };

    this.http.post('http://localhost:3000/enrollments', body).subscribe({
      next: () => {
        alert('Student enrolled successfully!');
        this.loadData();
        this.closeModal();
      },
      error: (err) => {
        alert('Error enrolling student');
      }
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._courseApi.getCourses().subscribe((courses: any) => {
      this.courses = courses.filter((c: any) => c.isArchived === false);
      
      this._userApi.getAllUsers().subscribe((users: any) => {
        this.users = users;
        this.students = users.filter((u: any) => u.role.toLowerCase() === 'student');
        
        this.http.get<any[]>('http://localhost:3000/enrollments').subscribe((enrollments) => {
          this.enrollments = enrollments;
          this.totalEnrollments = enrollments.length;

          this.courses.forEach(course => {
            const count = this.enrollments.filter(e => e.courseId == course.id).length;
            course.enrolledstudents = count;
          });

          this.mapCoursesToStudents();
        });
      });
    });
  }

  mapCoursesToStudents() {
    this.studentsWithCourses = [];
    this.totalInstructors = this.users.filter((u) => u.role.toLowerCase() === 'instructor').length;

    this.enrollments.forEach((en) => {
      const student = this.students.find((s) => s.id == en.studentId);
      const course = this.courses.find((c) => c.id == en.courseId);

      if (student && course) {
        const instructor = this.users.find((u) => u.id == course.authorId);
        
        this.studentsWithCourses.push({
          studentName: student.fullname || student.username,
          courseName: course.title,
          instructorName: instructor?.fullname || 'Unknown Instructor',
          enrollmentDate: en.enrollmentDate,
          progress: en.progress,
        });
        course.instructorName = instructor?.fullname || 'Unknown Instructor';
      }
    });
    this.filteredUsers = this.studentsWithCourses;
  }

  search() {
    if (this.searchTerm === '') {
      this.filteredUsers = this.studentsWithCourses;
    } else {
      this.filteredUsers = this.studentsWithCourses.filter((student) =>
        student.studentName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  getInitials(name: string): string {
    if (!name) return '';
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    } else {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
  }
}