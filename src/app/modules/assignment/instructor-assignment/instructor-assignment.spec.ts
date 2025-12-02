import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAssignment } from './instructor-assignment';

describe('InstructorAssignment', () => {
  let component: InstructorAssignment;
  let fixture: ComponentFixture<InstructorAssignment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstructorAssignment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorAssignment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
