import { createAction,props } from '@ngrx/store';
import { Person } from '../models/Person';

export const addPersonSuccess = createAction('[Person Input Component] Add A Person to the Store', props<{person: Person}>());
export const reset = createAction('[Person Input Component] Reset the Store');
export const addPersonProcessing = createAction('[Person Input Component] Add A Person to the person processing flow', props<{person: Person}>());
export const addFriend = createAction('[Friend Validator] Add A friend to a Person', props<{person: string, friend: Person}>());
