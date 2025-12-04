import { Component } from '@angular/core';
import { Course } from '../../../core/models/Course';
import { Lecture } from '../../../core/models/Material';
import { ApiCourse } from '../../../core/services/api-course';
import { Auth } from '../../../core/services/auth';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { categories } from '../../../core/models/categories';
@Component({
  selector: 'app-create-course',
  standalone: false,
  templateUrl: './create-course.html',
  styleUrl: './create-course.css',
})
export class CreateCourse {
  courseForm: FormGroup = new FormGroup({});
  authorName: string = '';
  authorId: string = "0";
  coursesCount: number = 0;

  constructor(private _course: ApiCourse, private _auth: Auth, private _formBuilder: FormBuilder, private _router: Router) {

  }
  userPayload: any
  // constants
  categories = categories

  //learning objectives Logic
  learningObjectives: string[] = [''];

  addObjective() {
    this.learningObjectives.push('');
  }

  removeObjective(index: number) {
    this.learningObjectives.splice(index, 1);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
  //lectures logic
  lectures: Lecture[] = [
    { title: '', duration: 0, link: '', status: false },
  ];

  addLecture() {
    this.lectures.push({ title: '', duration: 0, link: '', status: false });
  }

  removeLecture(index: number) {
    this.lectures.splice(index, 1);
  }

  trackByLecture(index: number, obj: any): any {
    return index;
  }


  createCourse() {
    console.log("this.courseForm.value", this.courseForm.value);
    if (this.courseForm.invalid) {

      alert('All information is required');
      return;
    }
    else if (this.authorId === "0") {
      alert('Unauthorized Access');
      console.log("Unauthorized Access");
      return
    }
    const data = this.courseForm.value;
    this._course.saveCourse(data).subscribe(
      (res: any) => {

        alert("Course Created Successfully");
        console.log(res);
        this.navigateToCourses()

      },
      (error) => {
        console.error('Error creating course:', error);
      }
    );



  }
  navigateToCourses() {
    this._router.navigate(['course/']);
  }
  ngOnInit(): void {
    const payload = this._auth.getUserPayload()
    if (payload && this._auth.isLoggedInWithRole('instructor')) {
      this.authorName = payload.username;
      this.authorId = payload.id;
      this.courseForm = this._formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        authorName: [{ value: this.authorName }],
        authorId: [{ value: this.authorId }],
        price: ['', Validators.required],
        hours: ['', Validators.required],
        category: ['', Validators.required],
        imageUrl: ['placeholder.png'],
        learningObjectives: [{ value: this.learningObjectives }],
        Material: [{ value: this.lectures }],
        assignments: this._formBuilder.array([])
      });
    }

  }
}
