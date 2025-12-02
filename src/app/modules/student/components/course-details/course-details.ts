import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-course-details',
  standalone: false,
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails {
  courseId: number = 0;
  courseData: any;
  activeTab: string = 'content';

  allCourses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      instructor: 'Dr. Sarah Johnson',
      imageUrl: 'assets/images/web-dev.jpg',
      progress: 65,
      totalLessons: 20
    },
    {
      id: 2,
      title: 'Data Science with Python',
      instructor: 'Prof. Michael Chen',
      imageUrl: 'assets/images/data-science.jpg',
      progress: 42,
      totalLessons: 40
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: 'Emily Rodriguez',
      imageUrl: 'assets/images/ui-ux.jpg',
      progress: 88,
      totalLessons: 15
    }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    this.courseData = this.allCourses.find(c => c.id === this.courseId);
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }
}
