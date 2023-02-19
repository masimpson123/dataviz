import {Injectable} from '@angular/core';
import * as actions from '../store/michael-io-app.actions';
import { MichaelIOState } from '../store/michael-io-app.reducer';
import {Actions, createEffect, ofType, concatLatestFrom} from '@ngrx/effects';
import {tap, map, mergeMap, switchMap, catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {Person} from '../models/Person';
import {FriendValidatorService} from '../services/friend-validator.service';
import {Store} from '@ngrx/store';

@Injectable()
export class PersonDataIntegrityEffects {
  constructor(
    private actions$: Actions,
    private friendValidator:FriendValidatorService,
    private store: Store<{state: MichaelIOState}>,
  ) {}

  // TODO(michaelsimpson): add error handling
  // TODO(michaelsimpson): error if name is already in use or allow
  // duplicate names
  personDataIntegrity$ = createEffect(() => this.actions$.pipe(
      ofType(actions.addPersonProcessing),
      switchMap((action) => this.friendValidator.nullCheck(action.person).pipe(
          concatLatestFrom(() => this.store),
          mergeMap(([person, store]) => {
            // ensure duplicates are not input into the NgRx Store
            store.state.people.forEach((value: Person, key:string) => {
              if (person.name === value.name) {
                throw new Error('NO DUPLICATE ENTRIES (' + person.name + ')');
              }
            });
            // ensure friendship links are mutual in NgRx store (ie no Firestore)
            for (const friend of person.friends) {
              if (store.state.people.has(friend)) {
                const friendData = store.state.people.get(friend)!;
                if (!friendData.friends.includes(person.name)) {
                  this.store.dispatch(actions.addFriend({person: person.name, friend: friendData}));
                }
              }
            }
            store.state.people.forEach((value: Person, key:string) => {
              for (const friend of value.friends) {
                if (friend === person.name && !person.friends.includes(value.name)) {
                  person.addFriend(value.name);
                }
              }
            });
            return of(person);
          }),
          map((value) => actions.addPersonSuccess({person: value})),
          catchError((error) => of(actions.addPersonFailure({error: error}))),
      )),
  ));
}
