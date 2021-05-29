import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Person } from '../../models/Person';
import { FriendInputComponent } from './friend-input.component';
import { friendLoggerReducer } from '../../store/friend-logger.reducer';
import { StoreModule } from '@ngrx/store';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FriendInputComponent', () => {
  let component: FriendInputComponent;
  let fixture: ComponentFixture<FriendInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ people: friendLoggerReducer }),
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule,
        MatListModule,
        MatCardModule,
        NoopAnimationsModule,
      ],
      declarations: [ FriendInputComponent ],
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

    let nameInput = form.controls.name;
    nameInput.setValue('Tony');
    let friendsInput = form.controls.friends;
    friendsInput.setValue(['Natasha']);
    let ageInput = form.controls.age;
    ageInput.setValue('32');
    let weightInput = form.controls.weight;
    weightInput.setValue('180');

    component.addPerson();

    nameInput = form.controls.name;
    nameInput.setValue('Natasha');
    friendsInput = form.controls.friends;
    friendsInput.setValue(['Carly']);
    ageInput = form.controls.age;
    ageInput.setValue('29');
    weightInput = form.controls.weight;
    weightInput.setValue('120');

    component.addPerson();

    const names: string[] = [];

    for(let person of component.people){
      names.push(person.name);
    }

    // TODO(michaelsimpson): write expects that confirm friend, age and weight
    // are stored and fetched as expected.
    expect(component.people.length === 2).toBe(true);
    expect(names.includes('Tony')).toBe(true);
    expect(names.includes('Natasha')).toBe(true);
  });
});
