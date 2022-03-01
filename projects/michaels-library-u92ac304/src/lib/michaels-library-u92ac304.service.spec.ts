import { TestBed } from '@angular/core/testing';

import { MichaelsLibraryU92ac304Service } from './michaels-library-u92ac304.service';

describe('MichaelsLibraryU92ac304Service', () => {
  let service: MichaelsLibraryU92ac304Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MichaelsLibraryU92ac304Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
