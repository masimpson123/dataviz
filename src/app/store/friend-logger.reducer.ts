import { createReducer, on, Action } from '@ngrx/store';
import { addPerson, reset } from './friend-logger.actions';
import { Person } from '../models/Person';

export let friendLoggerState:Map<string,Person> = new Map();

const _friendLoggerReducer = createReducer(
  friendLoggerState,
  on(addPerson, (state,action) => friendLoggerState.set(action.person.name,action.person)),
  on(reset, (state,action) => friendLoggerState = new Map<string,Person>()));

export function friendLoggerReducer(state:Map<string,Person>|undefined, action: Action) {
  return _friendLoggerReducer(state, action);
}
