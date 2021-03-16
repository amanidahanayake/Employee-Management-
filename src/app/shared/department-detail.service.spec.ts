import { TestBed } from '@angular/core/testing';

import { DepartmentDetailService } from './department-detail.service';

describe('DepartmentDetailService', () => {
  let service: DepartmentDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
