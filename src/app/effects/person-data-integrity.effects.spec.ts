import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Observable} from 'rxjs';
import {michaelIOAppReducer} from '../store/michael-io-app.reducer';
import {StoreModule} from '@ngrx/store';

import {PersonDataIntegrityEffects} from './person-data-integrity.effects';

describe('PersonDataIntegrityEffects', () => {
  let actions$: Observable<any>;
  let effects: PersonDataIntegrityEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({people: michaelIOAppReducer}),
      ],
      providers: [
        PersonDataIntegrityEffects,
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(PersonDataIntegrityEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
