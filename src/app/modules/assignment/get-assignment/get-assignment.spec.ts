import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAssignment } from './get-assignment';

describe('InstructorAssignment', () => {
  let component: GetAssignment;
  let fixture: ComponentFixture<GetAssignment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAssignment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAssignment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
