import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentPlayer } from './assignment-player';

describe('AssignmentPlayer', () => {
  let component: AssignmentPlayer;
  let fixture: ComponentFixture<AssignmentPlayer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignmentPlayer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentPlayer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
