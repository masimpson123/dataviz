import { createReducer, on, Action } from '@ngrx/store';
import { addPerson } from './friend-logger.actions';
import { Person } from '../models/Person';

//TODO(michaelsimpson): prevent duplicates by using a map
export const initialState:Person[] = [];

const _friendLoggerReducer = createReducer(
  initialState,
  on(addPerson, (state,action) => [...state].concat(action.person)));

export function friendLoggerReducer(state:Person[]|undefined, action: Action) {
  return _friendLoggerReducer(state, action);
}
