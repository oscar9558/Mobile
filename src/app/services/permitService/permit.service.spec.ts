import { TestBed } from '@angular/core/testing';

import { PermitService } from './permit.service';

describe('PermitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermitService = TestBed.get(PermitService);
    expect(service).toBeTruthy();
  });
});
