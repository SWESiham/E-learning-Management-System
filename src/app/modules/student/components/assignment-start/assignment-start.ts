import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-assignment-start',
  standalone: false,
  templateUrl: './assignment-start.html',
  styleUrl: './assignment-start.css',
})
export class AssignmentStart implements OnInit {

  assignmentId: number = 0;
  assignmentTitle: string = 'Loading Assignment...';
  totalPoints: number = 0;
  questionCount: number = 0;

  private assignments = [
    { id: 101, title: 'HTML/CSS Project - Build Portfolio', points: 100, questions: 1 },
    { id: 102, title: 'React Project - Todo Application', points: 150, questions: 5 },
    { id: 103, title: 'Final Project - Full-Stack Application', points: 300, questions: 10 }
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.assignmentId = Number(params.get('id'));

      const assignment = this.assignments.find(a => a.id === this.assignmentId);
      if (assignment) {
        this.assignmentTitle = assignment.title;
        this.totalPoints = assignment.points;
        this.questionCount = assignment.questions;
      }
    });
  }


}
