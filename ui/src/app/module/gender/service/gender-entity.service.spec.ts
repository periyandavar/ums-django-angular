import { TestBed } from '@angular/core/testing';

import { GenderEntityService } from './gender-entity.service';

describe('GenderEntityService', () => {
  let service: GenderEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenderEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
