import { createReducer, on, Action } from '@ngrx/store';
import { addPersonFailure, addPersonSuccess, addFriend, reset } from './michael-io-app.actions';
import { Person } from '../models/Person';

export let michaelIOAppState:Map<string,Person> = new Map();

const _michaelIOAppReducer = createReducer(
  michaelIOAppState,
  on(addPersonSuccess, (state,action) => state.set(action.person.name,action.person)),
  on(addFriend, (state,action) => state.set(
      action.friend.name,
      new Person(
        action.friend.name,
        [...action.friend.friends, action.person],
        action.friend.age,
        action.friend.weight,
        (Math.random() * 100_000)))),
  on(reset, (state,action) => {
    state.clear();
    return new Map();
  }),
  on(addPersonFailure, (state,action) => {
    console.error(action.error);
    return state;
  }));

export function michaelIOAppReducer(state:Map<string,Person>|undefined, action: Action) {
  return _michaelIOAppReducer(state, action);
}
