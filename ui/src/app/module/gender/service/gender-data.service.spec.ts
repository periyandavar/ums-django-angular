import { TestBed } from '@angular/core/testing';

import { GenderDataService } from './gender-data.service';

describe('GenderDataService', () => {
  let service: GenderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
