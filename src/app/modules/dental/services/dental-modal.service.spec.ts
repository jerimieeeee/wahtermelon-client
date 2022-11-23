import { TestBed } from '@angular/core/testing';

import { DentalModalService } from './dental-modal.service';

describe('DentalModalService', () => {
  let service: DentalModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DentalModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
