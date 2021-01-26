import { TestBed } from '@angular/core/testing';

import { MaintSchemeService } from './maint-scheme.service';

describe('MaintSchemeService', () => {
  let service: MaintSchemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintSchemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
