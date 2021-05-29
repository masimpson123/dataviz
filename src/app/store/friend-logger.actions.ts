import { createAction,props } from '@ngrx/store';
import { Person } from '../models/Person';

export const addPerson = createAction('[Person Input Component] Add A Person to the Store', props<{person: Person}>());
