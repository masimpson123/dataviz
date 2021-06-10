import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PersonDataIntegrityEffects } from './person-data-integrity.effects';

describe('PersonDataIntegrityEffects', () => {
  let actions$: Observable<any>;
  let effects: PersonDataIntegrityEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PersonDataIntegrityEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PersonDataIntegrityEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
