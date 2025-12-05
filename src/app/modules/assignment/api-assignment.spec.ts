import { TestBed } from '@angular/core/testing';

import { ApiAssignment } from './api-assignment';

describe('ApiAssignment', () => {
  let service: ApiAssignment;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiAssignment);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
