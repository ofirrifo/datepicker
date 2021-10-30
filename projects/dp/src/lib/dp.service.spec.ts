import { TestBed } from '@angular/core/testing';

import { DpService } from './dp.service';

describe('DpService', () => {
  let service: DpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
