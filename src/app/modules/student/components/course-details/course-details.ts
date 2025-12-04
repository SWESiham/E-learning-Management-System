import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from './../../../../core/services/student-service';
import { Auth } from '../../../../core/services/auth';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-course-details',
  standalone: false,
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails implements OnInit {
  courseId!: string;
  courseData: any;
  activeTab: string = 'content';


  constructor(private route: ActivatedRoute, private studentService: StudentService,private sanitizer: DomSanitizer) { }

  _auth = inject(Auth);
  userId!: string;
  currentVideoUrl: SafeResourceUrl | null = null;
  userName!: string;
  enrollments: any[] = [];
  courses: any[] = [];
  progress!: number;
  enrollID!: string;

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id') || '';
    const user = this._auth.getUserPayload();
    console.log("coursessss id : " + user['id']);
    console.log("student userame : " + user['fullname']);
    this.userId = user['id'];
    this.userName = user['fullname'];
    console.log(this.userName);
    this.loadCourseDetails();
  }
  loadCourseDetails(): void {
    this.studentService.getStudeEnrollments(this.userId).subscribe((res) => {
      this.enrollments = res as any[];
      const enroll = this.enrollments.find(e => e.courseId == this.courseId);
      if (enroll) {
        this.progress = enroll.progress;
        this.enrollID = enroll.id;
      }

      this.studentService.getCourseById(this.courseId).subscribe((data: any) => {
        this.courseData = data;
        console.log(this.courseData);
        
      });
    });
  
    if (this.currentVideoUrl !== null) {
      this.currentVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.courseData.Material.value[0].link);
    }
  }

  toggleLessonStatus(index: number, event: Event) {
    event.stopPropagation();
    const lesson = this.courseData.Material.value[index];
    lesson.status = !lesson.status;
   this.studentService.updateCourseMaterialStatus(this.courseId, this.courseData).subscribe({
    next: (res) => {
      console.log("Course Material Updated Successfully!", res);
    },
    error: (err) => {
      console.error("Error updating course material", err);
    }
  });
    this.calculateProgress();
  }
  calculateProgress() {
    const totalLessons = this.courseData.Material.value.length;
    const completedLessons = this.courseData.Material.value.filter((l: any) => l.status).length;
    
    const newProgress = Math.round((completedLessons / totalLessons) * 100);
    this.progress = newProgress;
    if (this.enrollID) {
        const enrollmentData = this.enrollments.find(e => e.id === this.enrollID);
        if(enrollmentData) {
            enrollmentData.progress = this.progress;
            
            this.studentService.updateEnrollment(this.enrollID, enrollmentData).subscribe({
                next: (res) => {
                    console.log("Progress Saved Successfully!", res);
                },
                error: (err) => {
                    console.error("Error saving progress", err);
                }
            });
        }
    }
  }
  playVideo(link: string) {
  this.currentVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(link);
}

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }
}
