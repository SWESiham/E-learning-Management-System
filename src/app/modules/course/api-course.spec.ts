import { TestBed } from '@angular/core/testing';

import { ApiCourse } from './api-course';

describe('ApiCourse', () => {
  let service: ApiCourse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCourse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
