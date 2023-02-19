import {createReducer, on, Action} from '@ngrx/store';
import {addPersonFailure, addPersonSuccess, addFriend, reset, fetchPeople} from './michael-io-app.actions';
import {Person} from '../models/Person';

export const michaelIOAppState: MichaelIOState = {
  people: new Map(),
  accumulatedMetrics: ({ total: 0, senior: 0 })
}

export interface MichaelIOState {
  people: Map<string, Person>
  accumulatedMetrics: { total: number, senior: number }
}

const _michaelIOAppReducer = createReducer(
    michaelIOAppState,
    on(addPersonSuccess, (state:any, action) =>
      ({
       ...state,
       people: new Map(state.people).set(action.person.name, action.person)
     })),
    on(addFriend, (state, action) =>
      ({
        ...state,
        people: new Map(state.people).set(
        action.friend.name,
        new Person(
          action.friend.name,
          [...action.friend.friends, action.person],
          action.friend.age,
          action.friend.security,
          (Math.random() * 100_000)))})),
    on(reset, (state, action) => ({
      ...state,
      people: new Map()})),
    on(addPersonFailure, (state, action) => {
      console.error(action.error);
      return state;
    }),
    on(fetchPeople, (state, action) => {
      return {
      ...state,
      accumulatedMetrics: {
        total: state.accumulatedMetrics.total + action.metrics.total,
        senior: state.accumulatedMetrics.senior + action.metrics.senior
      }};
    }));

export function michaelIOAppReducer(state:MichaelIOState|undefined, action: Action) {
  return _michaelIOAppReducer(state, action);
}
