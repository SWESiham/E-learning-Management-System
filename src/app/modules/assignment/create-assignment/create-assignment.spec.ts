import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssignment } from './create-assignment';

describe('CreateAssignment', () => {
  let component: CreateAssignment;
  let fixture: ComponentFixture<CreateAssignment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAssignment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAssignment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
