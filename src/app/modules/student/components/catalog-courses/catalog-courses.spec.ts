import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogCourses } from './catalog-courses';

describe('CatalogCourses', () => {
  let component: CatalogCourses;
  let fixture: ComponentFixture<CatalogCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
