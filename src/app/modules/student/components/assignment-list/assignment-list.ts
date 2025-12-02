import { Component } from '@angular/core';

@Component({
  selector: 'app-assignment-list',
  standalone: false,
  templateUrl: './assignment-list.html',
  styleUrl: './assignment-list.css',
})
export class AssignmentList {
  assignments = [
    { id: 101, title: 'HTML/CSS Project - Build Portfolio', points: 100, due: '2024-12-05', status: 'Submitted', grade: 95 },
    { id: 102, title: 'React Project - Todo Application', points: 150, due: '2024-12-10', status: 'Not Started', grade: null },
    { id: 103, title: 'Final Project - Full-Stack Application', points: 300, due: '2024-12-30', status: 'Not Started', grade: null }
  ];
}
