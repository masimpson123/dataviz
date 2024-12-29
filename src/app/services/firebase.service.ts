import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import {Observable, ReplaySubject} from 'rxjs';
import {take} from 'rxjs/operators';
import {Person} from '../models/Person';
import {addPersonProcessing} from '../store/michael-io-app.actions';
import {Store} from '@ngrx/store';
import {FirebasePerson} from '../models/models';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {User} from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  people = this.firestore.collection('people').valueChanges({idField: 'id'}) as Observable<FirebasePerson[]>;
  user: ReplaySubject<User> = new ReplaySubject(1);

  constructor(
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private fireAuth: AngularFireAuth,
    private store: Store<{ people: Map<string, Person> }>,
  ) {
    this.fireAuth.onAuthStateChanged((user) => {
      if (!user) return;
      this.user.next(user as User);
    });
  }

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

  createUser(email:string, password:string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("user created!");
    })
    .catch((error) => {
      alert(error);
    });
  }

  signIn(email:string, password:string) {
    this.fireAuth.signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log("user signed in!");
    })
    .catch((error) => {
      alert(error);
    });
  }

  signOut() {
    this.fireAuth.signOut().then(() => {
      this.user.next(undefined);
      console.log("Sign out!");
    }).catch((error) => {
      alert(error);
    });
  }
}
