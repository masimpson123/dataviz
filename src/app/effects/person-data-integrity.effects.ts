import { Injectable } from '@angular/core';
import * as actions from '../store/friend-logger.actions';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { tap, map, mergeMap, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Person } from '../models/Person';
import { FriendValidatorService } from '../services/friend-validator.service';
import { Store } from '@ngrx/store';

@Injectable()
export class PersonDataIntegrityEffects {

  constructor(
    private actions$: Actions,
    private friendValidator:FriendValidatorService,
    private store: Store<{ people: Map<string,Person> }>
  ) {}

  // TODO(michaelsimpson): add error handling
  // TODO(michaelsimpson): error if name is already in use or allow
  // duplicate names
  personDataIntegrity$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addPersonProcessing),
    switchMap(action => this.friendValidator.nullCheck(action.person).pipe(
      concatLatestFrom(() => this.store.select('people')),
      mergeMap(([person,people]) => {
        // ensure friendship links are mutual
        for (let friend of person.friends) {
          if(people.has(friend)){
            const friendData = people.get(friend)!;
            if(!friendData.friends.includes(person.name)) {
              this.store.dispatch(actions.addFriend({person:person.name,friend:friendData}));
            }
          }
        }
        people.forEach((value: Person,key:string) => {
          for(let friend of value.friends){
            if(friend === person.name && !person.friends.includes(value.name)){
              person.addFriend(value.name);
            }
          }
        });
        return of(person);
      }),
      map(value => actions.addPersonSuccess({person:value})),
    ))
  ));

}
