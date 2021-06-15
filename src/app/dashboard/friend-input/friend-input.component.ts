import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addPersonProcessing, reset } from '../../store/friend-logger.actions';
import { Person } from '../../models/Person';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-friend-input',
  templateUrl: './friend-input.component.html',
  styleUrls: ['./friend-input.component.css']
})
export class FriendInputComponent {
  people$: Observable<Map<string,Person>>;
  people: Map<string,Person> = new Map();
  // TODO(michaelsimpson): properly validate this data
  personForm = new FormGroup({
    name: new FormControl(''),
    friends: this.fb.array([
      this.fb.control('')
    ]),
    age: new FormControl(''),
    weight: new FormControl(''),
  });

  get friends() {
    return this.personForm.get('friends') as FormArray;
  }

  addFriend() {
    this.friends.push(this.fb.control(''));
  }

  deleteFriend(position: number) {
    this.friends.removeAt(position);
  }

  constructor(
    private store: Store<{ people: Map<string,Person> }>,
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
  ) {
    // TODO(michaelsimpson): can this be replaced with an async pipe
    // in the template?
    this.people$ = store.select('people');
    this.people$.subscribe((res)=>{
      this.people=res;
    });
  }

  // TODO(michaelsimpson): ensure all friendships are mutual or update network graph
  // so that it indicates one way friendships
  addPerson() {
    for(let person of this.people){
      if (this.people.has(this.personForm.controls.name.value)) {
        alert("Duplicate entries not permitted!");
        return;
      }
    }
    const name = this.personForm.controls.name.value;
    const friends = this.personForm.controls.friends.value;
    const age = this.personForm.controls.age.value;
    const weight = this.personForm.controls.weight.value;
    const person = new Person(name, friends, age, weight, (Math.random() * 100_000));
    this.store.dispatch(addPersonProcessing({person:person}));
    this.firebaseService.write(person);
    this.resetForm();
  }

  formInvalid(){
    return !this.personForm.controls.name.value ||
      !this.personForm.controls.age.value ||
      !this.personForm.controls.weight.value
  }

  resetForm() {
    this.personForm.reset();
    this.friends.clear();
    this.addFriend();
  }

  resetStore(){
    this.store.dispatch(reset());
  }

  loadFirebaseStore(){
    this.firebaseService.read();
  }
}
