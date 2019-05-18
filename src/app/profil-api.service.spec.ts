import { TestBed } from '@angular/core/testing';

import { ProfilApiService } from './profil-api.service';

describe('ProfilApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfilApiService = TestBed.get(ProfilApiService);
    expect(service).toBeTruthy();
  });
});
