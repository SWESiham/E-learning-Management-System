import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetInstructorCourses } from './get-instructor-courses';

describe('GetInstructorCourses', () => {
  let component: GetInstructorCourses;
  let fixture: ComponentFixture<GetInstructorCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetInstructorCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetInstructorCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
