import { Component } from '@angular/core';
import { ApiCourse } from '../api-course';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lecture } from '../../../core/models/Material';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-course',
  standalone: false,
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.css',
})
export class EditCourse {
  constructor( private _router: Router,private toastr: ToastrService,private _auth: Auth,private _course: ApiCourse,private _formBuilder: FormBuilder,private route: ActivatedRoute) {
     this.courseForm = this._formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    authorName: ['', Validators.required],
    authorId: ['', Validators.required],
    price: ['', Validators.required],
    hours: ['', Validators.required],
    category: ['', Validators.required],
    imageUrl: [''],
    learningObjectives: this._formBuilder.array([]),
    Material: this._formBuilder.array([]),
    assignments: this._formBuilder.array([])
  });
  }
  course: any;
  courseId: any;
  courseForm: FormGroup ;
   categories: string[] = [
      'Web Development',
      'Mobile Development',
      'Data Science',
      'Machine Learning',
      'Artificial Intelligence',
      'Cloud Computing',
      'Cybersecurity',
      'Blockchain',
      'Game Development',
      'UI/UX Design',
      'Digital Marketing',
      'Other',
      
      
    ];
  
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
   checkNotEmpty(): boolean {
    let flag=true
  this.lectures.forEach((lecture: any) => {
    if (lecture.title==="" || lecture.duration===0 || lecture.link==="") {
     this.showToast('warning', 'All information is required');
      flag=false
      return;
    }
  });
  if(flag)
  {
    
  

  this.learningObjectives.forEach((l: any) => {
    if (l==="") {
      this.showToast('warning', 'All information is required');
      flag=false
      return ;
    }
  });}
  return flag
}
  editCourse() {
    
    if(!this.checkNotEmpty())
    {
      return
    }
    if (this.courseForm.invalid) {
      
     this.showToast('warning', 'All information is required');
    return;
  }
    this._course.editCourse(this.courseId!, this.courseForm.value).subscribe((res: any) => {
      console.log("res", res);
      this.showToast('success', 'Course Updated Successfully');
      this._router.navigate(['course/instructorCourses']);
    })
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
        positionClass: 'toast-top-center',
      }
    );
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.courseId=id
    console.log("id", id);
     const payload= this._auth.getUserPayload()
      if(payload&&this._auth.isLoggedInWithRole('Instructor')){
   this._course.getCourse(id!).subscribe((res: any) => {
      this.course = res;
      console.log("this.course", this.course);
       this.learningObjectives= [...this.course.learningObjectives.value]
      this.lectures= [...this.course.Material.value]
        this.courseForm = this._formBuilder.group({
          title: [this.course.title, Validators.required],
          description: [this.course.description, Validators.required],
          authorName: [ this.course.authorName],
          authorId: [this.course.authorId ],

          price: [this.course.price, Validators.required],
          hours: [this.course.hours, Validators.required],
          category: [this.course.category, Validators.required],
          imageUrl:this.course.imageUrl || ['placeholder.png'],
          learningObjectives:  [{ value: this.learningObjectives }],
           Material: [{ value: this.lectures }],
          assignments: this._formBuilder.array([])
        });
   

  })}
 
   
   

  }
}
