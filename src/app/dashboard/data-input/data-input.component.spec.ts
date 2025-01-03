import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Person} from '../../models/Person';
import {DataInputComponent} from './data-input.component';
import {michaelIOAppReducer} from '../../store/michael-io-app.reducer';
import {StoreModule} from '@ngrx/store';
import {FormGroup, FormControl, FormBuilder, FormArray} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {EffectsModule} from '@ngrx/effects';
import {PersonDataIntegrityEffects} from '../../effects/person-data-integrity.effects';
import {FirebaseService} from '../../services/firebase.service';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {AngularFireModule} from '@angular/fire/compat';
import {firebaseConfig} from 'src/environments/environment';

describe('DataInputComponent', () => {
  let component: DataInputComponent;
  let fixture: ComponentFixture<DataInputComponent>;

  const firebaseServiceMock = jasmine.createSpyObj('FirebaseService', ['write']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: FirebaseService, useValue: firebaseServiceMock},
      ],
      imports: [
        StoreModule.forRoot({people: michaelIOAppReducer}),
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
        AngularFirestoreModule,
      ],
      declarations: [DataInputComponent],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataInputComponent);
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
    let securityInput = form.controls.security;
    securityInput.setValue('180');

    component.addPerson();

    nameInput = form.controls.name;
    nameInput.setValue('Mathew');
    friendsInput = form.controls.friends;
    friendsInput.setValue(['Carly']);
    ageInput = form.controls.age;
    ageInput.setValue('29');
    securityInput = form.controls.security;
    securityInput.setValue('120');

    component.addPerson();

    const names: string[] = [];

    component.people.forEach((value: Person, key:string) => {
      names.push(value.name);
    });

    // TODO(michaelsimpson): write expects that confirm friend, age, and
    // security term are stored and fetched as expected
    expect(component.people.size === 2).toBe(true);
    expect(names.includes('Tony')).toBe(true);
    expect(names.includes('Mathew')).toBe(true);
  });
});
