import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCourseCataolg } from './admin-course-cataolg';

describe('AdminCourseCataolg', () => {
  let component: AdminCourseCataolg;
  let fixture: ComponentFixture<AdminCourseCataolg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCourseCataolg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCourseCataolg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
