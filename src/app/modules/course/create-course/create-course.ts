import { Component } from '@angular/core';
import { Course } from '../../../core/models/Course';
import { Lecture } from '../../../core/models/Material';
import { ApiCourse } from '../api-course';
import { Auth } from '../../../core/services/auth';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { categories } from '../../../core/models/categories';
import { UserService } from '../../../core/services/user-service';
@Component({
  selector: 'app-create-course',
  standalone: false,
  templateUrl: './create-course.html',
  styleUrl: './create-course.css',
})
export class CreateCourse {
  courseForm: FormGroup = new FormGroup({});
  authorName: string = '';
  authorId: string = '0';
  coursesCount: number = 0;
  authorsList: any[] = [];
  isAdmin: boolean = false;

  constructor(
    private toastr: ToastrService,
    private _course: ApiCourse,
    private _auth: Auth,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _userService: UserService,
    private route: ActivatedRoute
  ) {}

  userPayload: any;
  // constants
  categories = categories;

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
  lectures: Lecture[] = [{ title: '', duration: 0, link: '', status: false }];

  addLecture() {
    this.lectures.push({ title: '', duration: 0, link: '', status: false });
  }

  removeLecture(index: number) {
    this.lectures.splice(index, 1);
  }

  trackByLecture(index: number, obj: any): any {
    return index;
  }

  checkNotEmpty(): boolean {
    let flag = true;
    this.lectures.forEach((lecture: any) => {
      if (lecture.title === '' || lecture.duration === 0 || lecture.link === '') {
        flag = false;
        return;
      }
    });
    if (flag) {
    } else {
      this.learningObjectives.forEach((l: any) => {
        if (l === '') {
          flag = false;
          return;
        }
      });
    }
    return flag;
  }
  createCourse() {
    console.log('this.courseForm.value', this.courseForm.value);
    if (this.courseForm.invalid || !this.checkNotEmpty()) {
      console.log('invalid errororo');
      this.showToast('warning', 'All information is required');
      return;
    } else if (!this.courseForm.value.authorId) {
      console.log('errororo');
      return;
    }
    const data = this.courseForm.value;
    this._course.saveCourse(data).subscribe(
      (res: any) => {
        this.showToast('success', 'Course Created Successfully');
        this.navigateToCourses();
      },
      (error) => {
        console.error('Error creating course:', error);
      }
    );
  }
  navigateToCourses() {
    if (this.isAdmin) {
      this._router.navigate(['admin/coursecatalog']);
      return;
    }
    this._router.navigate(['course/instructorCourses']);
  }
  //  ngOnInit(): void {
  //    const payload= this._auth.getUserPayload()
  //       if(payload&&this._auth.isLoggedInWithRole('instructor')){
  //         this.authorName = payload.username;
  //         this.authorId = payload.id;
  //         this.courseForm = this._formBuilder.group({
  //           title: ['', Validators.required],
  //           description: ['', Validators.required],
  //           authorName: [{ value: this.authorName }],
  //           authorId: [{ value: this.authorId }],
  //           price: ['', Validators.required],
  //           hours: ['', Validators.required],
  //           category: ['', Validators.required],
  //           imageUrl: ['placeholder.png'],
  //           learningObjectives:  [{ value: this.learningObjectives }],
  //           Material: [{ value: this.lectures }],
  //           assignments: this._formBuilder.array([])
  //         });
  //       }

  //   }
  // inside create-course.ts

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.isAdmin = params['isAdmin'] === 'true';
    });
    // 1. Initialize the form structure immediately with empty/default values
    this.courseForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      authorName: [''], // Default empty
      authorId: [''], // Default empty
      price: ['', Validators.required],
      hours: ['', Validators.required],
      category: ['', Validators.required],
      imageUrl: ['placeholder.png'],
      learningObjectives: { value: this.learningObjectives },
      Material: { value: this.lectures },
      assignments: this._formBuilder.array([]),
    });

    this.getAuthors();

    // 2. Check logic and fill in the data
    const payload = this._auth.getUserPayload();

    if (payload && this._auth.isLoggedInWithRole('Instructor')) {
      this.authorName = payload.fullname;
      this.authorId = payload.id;

      // Use patchValue to update only specific fields safely
      this.courseForm.patchValue({
        authorName: this.authorName,
        authorId: this.authorId,
        // If you have existing data for objectives/material, patch them here too
      });
      console.log('this.authorName', this.authorName);
      console.log('this.authorId', this.authorId);
      console.log('this.courseForm.value', this.courseForm.value);
    }
  }
  showToast(type: any, message: any) {
    this.toastr.show(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' +
        message +
        '</span>',
      '',
      {
        timeOut: 4000,
        enableHtml: true,
        toastClass: 'alert alert-' + type + ' alert-with-icon',
        positionClass: 'toast-bottom-center',
      }
    );
  }

  getAuthors() {
    this._userService.getAllUsers().subscribe((res: any) => {
      this.authorsList = res.filter((u: any) => u.role === 'Instructor');
      console.log(this.authorsList);
    });
  }

  onAuthorChange() {
    const selectedId = this.courseForm.value.authorId;
    const selectedAuthor = this.authorsList.find((a) => a.id == selectedId);

    if (selectedAuthor) {
      this.courseForm.patchValue({
        authorName: selectedAuthor.fullname,
      });
    }

    console.log('Selected Author ID:', selectedId);
    console.log('Selected Author Name:', this.courseForm.value.authorName);
  }
}
