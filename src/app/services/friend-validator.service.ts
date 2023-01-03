import {Injectable} from '@angular/core';
import {Person} from '../models/Person';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FriendValidatorService {
  constructor() { }

  nullCheck(person: Person) {
    let friends = [...person.friends];
    friends = friends.filter(function(value, index, arr) {
      return value != '';
    });
    const personMutable = new Person(
        person.name,
        friends,
        person.age,
        person.security,
        person.id);
    return of(personMutable);
  }
}
