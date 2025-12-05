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
  // ... (نفس المتغيرات السابقة)
  instructorCourses: any[] = [];
  selectedCourseId: string | null = null;
  submissions: any[] = [];
  assignmentsMap: { [key: string]: string } = {}; 
  
  // (تعديل) متغيرات للتحكم في الـ Expand
  expandedSubmissionId: string | null = null; // يحمل الـ ID للكارت المفتوح
  
  // متغيرات الفورم (يتم تعبئتها عند فتح الكارت)
  gradeValue: number | null = null;
  feedbackValue: string = '';

  constructor(
    private _auth: Auth,
    private _apiCourse: ApiCourse,
    private _apiSubmission: ApiSubmission,
    private _apiAssignment: ApiAssignment
  ) {}

  // ... (ngOnInit, selectCourse, loadSubmissions كما هي) ...
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
    this.expandedSubmissionId = null; // إعادة تعيين عند تغيير الكورس
    
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

  // (جديد) دالة التبديل بين الفتح والغلق
  toggleExpand(submission: any) {
    if (this.expandedSubmissionId === submission.id) {
      // لو ضغط على نفس الكارت المفتوح -> اقفله
      this.closeExpand();
    } else {
      // لو ضغط على كارت جديد -> افتحه واملا البيانات
      this.expandedSubmissionId = submission.id;
      this.gradeValue = submission.grade;
      this.feedbackValue = submission.feedback || '';
    }
  }

  // (جديد) حفظ الدرجة
saveGrade(submission: any) {
    const updateData = {
      ...submission, // 1. نحتفظ بكل البيانات القديمة (الاسم، التاريخ، الرابط...)
      grade: this.gradeValue,      // 2. نحدث الدرجة
      feedback: this.feedbackValue,// 3. نحدث الملاحظات
      status: 'graded'             // 4. نغير الحالة
    };

    this._apiSubmission.gradeSubmission(submission.id, updateData).subscribe({
      next: () => {
        alert('Graded Successfully');
        
        // 5. (هام جداً) ننقل التحديث هنا عشان يشتغل بعد ما الحفظ يخلص
        this.loadSubmissions(this.selectedCourseId!); 
      },
      error: (err) => alert('Error saving grade')
    });
    
    // (حذفنا السطر من هنا لأنه كان بيشتغل قبل الأوان)
  }

  closeExpand() {
    this.expandedSubmissionId = null;
    this.gradeValue = null;
    this.feedbackValue = '';
  }
}