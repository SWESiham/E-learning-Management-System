import { TestBed } from '@angular/core/testing';

import { ApiEnrollment } from './api-enrollment';

describe('ApiEnrollment', () => {
  let service: ApiEnrollment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiEnrollment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
