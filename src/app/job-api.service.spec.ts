import { TestBed } from '@angular/core/testing';

import { JobApiService } from './job-api.service';

describe('JobApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobApiService = TestBed.get(JobApiService);
    expect(service).toBeTruthy();
  });
});
