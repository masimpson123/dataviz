import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {Person} from '../models/Person';
import {addPersonProcessing} from '../store/michael-io-app.actions';
import {Store} from '@ngrx/store';
import {FirebasePerson} from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  people = this.firestore.collection('people').valueChanges({idField: 'id'}) as Observable<FirebasePerson[]>;
  constructor(
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private store: Store<{ people: Map<string, Person> }>,
  ) {}
  write(person:Person) {
    // TODO(michaelsimpson): ensure name is not in use or allow for
    // duplicate names
    this.firestore.collection('people').add({
      name: person.name,
      age: person.age,
      friends: person.friends,
      security: person.security,
    });
  }
  read() {
    this.people.pipe(take(1)).subscribe((people: FirebasePerson[])=>{
      for (const person of people) {
        const newPerson = new Person(
            person.name,
            person.friends,
            Number(person.age),
            person.security,
            (Math.random() * 100_000));
        this.store.dispatch(addPersonProcessing({person: newPerson}));
      }
    });
  }
  upload(path: string, file: File): Promise<Observable<string>> {
    return this.fireStorage.upload(path, file).then(() => {
      console.log('SUCCESS');
    }).then(() => this.fireStorage.ref(path).getDownloadURL());
  }
}
