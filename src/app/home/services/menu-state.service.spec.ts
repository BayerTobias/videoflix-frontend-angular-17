import { TestBed } from '@angular/core/testing';

import { menuStateService } from './menu-state.service';

describe('menuStateService', () => {
  let service: menuStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(menuStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
