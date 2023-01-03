import {TestBed} from '@angular/core/testing';

import {FriendValidatorService} from './friend-validator.service';

describe('FriendValidatorService', () => {
  let service: FriendValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FriendValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
