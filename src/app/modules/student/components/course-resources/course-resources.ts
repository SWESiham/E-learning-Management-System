import { Component } from '@angular/core';

@Component({
  selector: 'app-course-resources',
  standalone: false,
  templateUrl: './course-resources.html',
  styleUrl: './course-resources.css',
})
export class CourseResources {
  resources = [
    { name: 'Course Syllabus.pdf', size: '2.4 MB', path: 'assets/resources/syllabus.pdf' },
    { name: 'Code Examples.zip', size: '15.8 MB', path: 'assets/resources/code.zip' },
    { name: 'Reference Guide.pdf', size: '5.2 MB', path: 'assets/resources/guide.pdf' },
    { name: 'Cheat Sheet.pdf', size: '1.1 MB', path: 'assets/resources/cheat.pdf' }
  ];
}
