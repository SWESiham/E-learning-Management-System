import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorCourseDetails } from './instructor-course-details';

describe('InstructorCourseDetails', () => {
  let component: InstructorCourseDetails;
  let fixture: ComponentFixture<InstructorCourseDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorCourseDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorCourseDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
