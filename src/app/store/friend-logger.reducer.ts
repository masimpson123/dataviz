import { createReducer, on, Action } from '@ngrx/store';
import { addPersonSuccess, addFriend, reset } from './friend-logger.actions';
import { Person } from '../models/Person';

export let friendLoggerState:Map<string,Person> = new Map();

const _friendLoggerReducer = createReducer(
  friendLoggerState,
  on(addPersonSuccess, (state,action) => state.set(action.person.name,action.person)),
  on(addFriend, (state,action) => state.set(
      action.friend.name,
      new Person(
        action.friend.name,
        [...action.friend.friends, action.person],
        action.friend.age,
        action.friend.weight,
        (Math.random() * 10000)))),
  on(reset, (state,action) => {
    state.clear();
    return new Map();
  }));

export function friendLoggerReducer(state:Map<string,Person>|undefined, action: Action) {
  return _friendLoggerReducer(state, action);
}
