import { TestBed } from '@angular/core/testing';

import { VitalsChartsService } from './vitals-charts.service';

describe('VitalsChartsService', () => {
  let service: VitalsChartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VitalsChartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
