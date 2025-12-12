import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEnrollement } from './admin-enrollement';

describe('AdminEnrollement', () => {
  let component: AdminEnrollement;
  let fixture: ComponentFixture<AdminEnrollement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminEnrollement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEnrollement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
