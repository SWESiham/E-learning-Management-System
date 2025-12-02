import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentStart } from './assignment-start';

describe('AssignmentStart', () => {
  let component: AssignmentStart;
  let fixture: ComponentFixture<AssignmentStart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignmentStart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentStart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
