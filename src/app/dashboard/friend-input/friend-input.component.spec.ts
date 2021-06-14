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
import { MatIconModule } from '@angular/material/icon';
import { EffectsModule } from '@ngrx/effects';
import { PersonDataIntegrityEffects } from '../../effects/person-data-integrity.effects';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/environments/environment';

describe('FriendInputComponent', () => {
  let component: FriendInputComponent;
  let fixture: ComponentFixture<FriendInputComponent>;

  const firebaseServiceMock = jasmine.createSpyObj('FirebaseService', ['write']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: FirebaseService, useValue: firebaseServiceMock }
      ],
      imports: [
        StoreModule.forRoot({ people: friendLoggerReducer }),
        EffectsModule.forRoot([PersonDataIntegrityEffects]),
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule,
        MatListModule,
        MatCardModule,
        MatIconModule,
        NoopAnimationsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule
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
    component.resetStore();
    const form = component.personForm;

    let nameInput = form.controls.name;
    nameInput.setValue('Tony');
    let friendsInput = form.controls.friends;
    friendsInput.setValue(['Jonathan']);
    let ageInput = form.controls.age;
    ageInput.setValue('32');
    let weightInput = form.controls.weight;
    weightInput.setValue('180');

    component.addPerson();

    nameInput = form.controls.name;
    nameInput.setValue('Mathew');
    friendsInput = form.controls.friends;
    friendsInput.setValue(['Carly']);
    ageInput = form.controls.age;
    ageInput.setValue('29');
    weightInput = form.controls.weight;
    weightInput.setValue('120');

    component.addPerson();

    const names: string[] = [];

    component.people.forEach((value: Person,key:string) => {
      names.push(value.name);
    });

    // TODO(michaelsimpson): write expects that confirm friend, age and weight
    // are stored and fetched as expected
    expect(component.people.size === 2).toBe(true);
    expect(names.includes('Tony')).toBe(true);
    expect(names.includes('Mathew')).toBe(true);
  });
});
