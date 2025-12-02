import { Component } from '@angular/core';

@Component({
  selector: 'app-my-courses',
  standalone: false,
  templateUrl: './my-courses.html',
  styleUrls: ['./my-courses.css']
})
export class MyCourses {
  courses = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      instructor: 'Dr. Sarah Johnson',
      imageUrl: 'assets/images/web-dev.jpg',
      progress: 65
    },
    {
      id: 2,
      title: 'Data Science with Python',
      instructor: 'Prof. Michael Chen',
      imageUrl: 'assets/images/data-science.jpg',
      progress: 42
    },
    {
      id: 3,
      title: 'UI/UX Design Principles',
      instructor: 'Emily Rodriguez',
      imageUrl: 'assets/images/ui-ux.jpg',
      progress: 88
    }
  ];

}