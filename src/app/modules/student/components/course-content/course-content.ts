import { Component } from '@angular/core';

@Component({
  selector: 'app-course-content',
  standalone: false,
  templateUrl: './course-content.html',
  styleUrl: './course-content.css',
})
export class CourseContent {
  syllabus = [
    { title: 'Introduction to Web Development', duration: '9:30', completed: true, type: 'Video' },
    { title: 'Setting Up Your Development Environment', duration: '12:49', completed: true, type: 'Video' },
    { title: 'HTML Fundamentals', duration: '19:20', completed: true, type: 'Video' },
    { title: 'CSS Styling: Flexbox Layout', duration: '22:40', completed: false, type: 'Video' },
    { title: 'Final Project Requirements', duration: '5:30', completed: false, type: 'Video' }
  ];
}
