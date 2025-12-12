import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashborad } from './admin-dashborad';

describe('AdminDashborad', () => {
  let component: AdminDashborad;
  let fixture: ComponentFixture<AdminDashborad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDashborad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDashborad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
