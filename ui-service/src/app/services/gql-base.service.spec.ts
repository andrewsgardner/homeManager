import { TestBed } from '@angular/core/testing';

import { GqlBaseService } from './gql-base.service';

describe('BaseService', () => {
  let service: GqlBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GqlBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
