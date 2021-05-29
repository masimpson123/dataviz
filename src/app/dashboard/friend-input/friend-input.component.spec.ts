import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendInputComponent } from './friend-input.component';

fdescribe('FriendInputComponent', () => {
  let component: FriendInputComponent;
  let fixture: ComponentFixture<FriendInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize as expected', () => {
    expect(component).toBeTruthy();
  });

  it('adds people to the store', () => {
    const form = component.personForm;
    expect(form.valid).toBeFalsy();

    const nameInput = form.controls.name;
    nameInput.setValue('Tony');
    const nameFriends = form.controls.friends;
    nameInput.setValue('Natasha');
    const nameInput = form.controls.age;
    nameInput.setValue('32');
    const nameInput = form.controls.weight;
    nameInput.setValue('180');

    component.addPerson();

    const nameInput = form.controls.name;
    nameInput.setValue('Natasha');
    const nameFriends = form.controls.friends;
    nameInput.setValue('Carly');
    const nameInput = form.controls.age;
    nameInput.setValue('29');
    const nameInput = form.controls.weight;
    nameInput.setValue('120');

    component.addPerson();

    const people = [];
    const names = [];

    const people$ = store.select('people');
    people$.subscribe((res)=>{
      for(let person of res){
        names.push(person.name);
      }
    });

    expect(people.length === 2).toBe(true);
    expect(names.includes('Michael')).toBe(true);
    expect(names.includes('Brianna')).toBe(true);
  });
});
