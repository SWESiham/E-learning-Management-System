import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-assignment-player',
  standalone: false,
  templateUrl: './assignment-player.html',
  styleUrl: './assignment-player.css',
})
export class AssignmentPlayer {
  assignmentId: number = 0;
  quizForm!: FormGroup;

  questions = [
    { id: 1, text: 'What is JSX in React?', type: 'mcq', options: ['A JavaScript library', 'A syntax extension for JavaScript', 'A CSS framework', 'A database'], points: 5 },
    { id: 2, text: 'React components can be written as functions.', type: 'mcq', options: ['True', 'False'], points: 5 },
    { id: 3, text: 'Which hook is used for managing state in functional components?', type: 'mcq', options: ['useEffect', 'useState', 'useContext', 'useReducer'], points: 5 },
    { id: 4, text: 'Explain the difference between props and state in React', type: 'essay', points: 10 },
    { id: 5, text: 'Describe when you would use the useEffect hook and provide an example', type: 'essay', points: 10 }
  ];

  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.assignmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
  }

  initForm(): void {
    const controls: { [key: string]: any } = {};
    this.questions.forEach(q => {
      controls[`q_${q.id}`] = ['', Validators.required];
    });
    this.quizForm = this.fb.group(controls);
  }

  submitQuiz() {
    if (this.quizForm.valid) {
      console.log('Quiz Submitted:', this.quizForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
