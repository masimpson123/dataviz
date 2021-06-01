import { createReducer, on, Action } from '@ngrx/store';
import { addPerson } from './friend-logger.actions';
import { Person } from '../models/Person';

// TODO(michaelsimpson): initialState should be a map of all the people.
// This would allow constant time retrievals based on unique display name or UUID.
export const initialState:Person[] = [];

const _friendLoggerReducer = createReducer(
  initialState,
  on(addPerson, (state,action) => [...state].concat(action.person)));

export function friendLoggerReducer(state:Person[]|undefined, action: Action) {
  return _friendLoggerReducer(state, action);
}
