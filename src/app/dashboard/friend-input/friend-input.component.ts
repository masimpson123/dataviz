import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { addPerson } from '../../store/friend-logger.actions';
import { Person } from '../../models/Person';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-friend-input',
  templateUrl: './friend-input.component.html',
  styleUrls: ['./friend-input.component.css']
})
export class FriendInputComponent {
  people$: Observable<Person[]>;
  people: Person[] = [];
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

  constructor(private store: Store<{ people: Person[] }>,private fb: FormBuilder) {
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
      if (person.name === this.personForm.controls.name.value) {
        alert("Duplicate entries not permitted!");
        return;
      }
    }
    const name = this.personForm.controls.name.value;
    const friends = this.personForm.controls.friends.value;
    const age = this.personForm.controls.age.value;
    const weight = this.personForm.controls.weight.value;
    const person = new Person(name, friends, age, weight, (Math.random() * 10000));
    this.store.dispatch(addPerson({person:person}));
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

  addMockData() {
    const person0 = new Person('Theodore',['Henry', 'Brianna', 'Lindsey'],15,160, (Math.random() * 10000));
    const person1 = new Person('Henry',['Hanzel','Thomas','Charles','Theodore','Brianna'],40,170, (Math.random() * 10000));
    const person2 = new Person('Brianna',['Theodore', 'Henry','Natasha', 'Seymore'],29,120, (Math.random() * 10000));
    const person3 = new Person('Natasha',['Brianna'],35,135, (Math.random() * 10000));
    const person4 = new Person('Seymore',['Brianna'],50,200, (Math.random() * 10000));
    const person5 = new Person('Lindsey',['Theodore'],20,140, (Math.random() * 10000));
    const person6 = new Person('Charles',['Henry'],33,176, (Math.random() * 10000));
    const person7 = new Person('Thomas',['Henry'],24,152, (Math.random() * 10000));
    const person8 = new Person('Hanzel',['Henry'],33,175, (Math.random() * 10000));
    this.store.dispatch(addPerson({person:person0}));
    this.store.dispatch(addPerson({person:person1}));
    this.store.dispatch(addPerson({person:person2}));
    this.store.dispatch(addPerson({person:person3}));
    this.store.dispatch(addPerson({person:person4}));
    this.store.dispatch(addPerson({person:person5}));
    this.store.dispatch(addPerson({person:person6}));
    this.store.dispatch(addPerson({person:person7}));
    this.store.dispatch(addPerson({person:person8}));
  }
}
