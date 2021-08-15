import { TestBed } from '@angular/core/testing';

import { ReprotsService } from './reprots.service';

describe('ReprotsService', () => {
  let service: ReprotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReprotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
