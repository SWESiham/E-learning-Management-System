import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiAssignment } from '../api-assignment';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-create-assignment',
  standalone: false,
  templateUrl: './create-assignment.html',
  styleUrl: './create-assignment.css',
})
export class CreateAssignment implements OnInit {
  createForm!: FormGroup;
  courseId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _apiAssignment: ApiAssignment,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.courseId = params['courseId'];
    });

this.createForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      assignmentLink: ['', Validators.required],
      dueDate: ['', Validators.required],
      points: [100, [Validators.required, Validators.min(1)]] 
    });
  }

  onSubmit() {
    if (this.createForm.valid && this.courseId) {
      const newAssignment = {
        id: this.generateRandomId(), 
        courseId: this.courseId,     
        ...this.createForm.value     
      };

      this._apiAssignment.createAssignment(newAssignment).subscribe({
        next: (res) => {
          console.log('Assignment Created', res);
          this.goBack(); 
        },
        error: (err) => {
          console.error('Error creating assignment', err);
          alert('Error creating assignment');
        }
      });
    } else {
      this.createForm.markAllAsTouched(); 
    }
  }

  goBack() {
    this.location.back();
  }

  private generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}