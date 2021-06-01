import { createReducer, on, Action } from '@ngrx/store';
import { addPerson, reset } from './friend-logger.actions';
import { Person } from '../models/Person';

export let initialState:Map<string,Person> = new Map();

const _friendLoggerReducer = createReducer(
  initialState,
  on(addPerson, (state,action) => initialState.set(action.person.name,action.person)),
  on(reset, (state,action) => initialState = new Map<string,Person>()),);

export function friendLoggerReducer(state:Map<string,Person>|undefined, action: Action) {
  return _friendLoggerReducer(state, action);
}
