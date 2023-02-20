import {createReducer, on, Action} from '@ngrx/store';
import {addPersonFailure, addPersonSuccess, addFriend, reset, fetchPeople} from './michael-io-app.actions';
import {Person} from '../models/Person';

export const michaelIOAppState: MichaelIOState = {
  people: new Map(),
  accumulatedMetrics: ({ total: 0, senior: 0 }),
  asyncPeople: []
}

export interface MichaelIOState {
  people: Map<string, Person>
  accumulatedMetrics: { total: number, senior: number },
  asyncPeople: {name: string, age: string}[]
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
      const metrics = action.people.reduce(
        (acc:any, cur:any) => ({
          total: acc.total + 1,
          senior: Number(cur.age) > 70 ? Number(cur.age) + 1 : Number(cur.age)
        }),
        { total: 0, senior: 0 });
      return {
      ...state,
      asyncPeople: (action.people.length) ? action.people : state.asyncPeople,
      accumulatedMetrics: {
        total: state.accumulatedMetrics.total + metrics.total,
        senior: state.accumulatedMetrics.senior + metrics.senior
      }};
    }));

export function michaelIOAppReducer(state:MichaelIOState|undefined, action: Action) {
  return _michaelIOAppReducer(state, action);
}
