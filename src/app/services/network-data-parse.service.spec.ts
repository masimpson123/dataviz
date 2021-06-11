import { TestBed } from '@angular/core/testing';

import { NetworkDataParseService } from './network-data-parse.service';

describe('NetworkDataParseService', () => {
  let service: NetworkDataParseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkDataParseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
