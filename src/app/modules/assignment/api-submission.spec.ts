import { TestBed } from '@angular/core/testing';

import { ApiSubmission } from './api-submission';

describe('ApiSubmission', () => {
  let service: ApiSubmission;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSubmission);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
