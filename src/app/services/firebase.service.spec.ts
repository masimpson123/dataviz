import {TestBed} from '@angular/core/testing';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {FirebaseService} from './firebase.service';
import {firebaseConfig} from 'src/environments/environment';
import {StoreModule} from '@ngrx/store';
import {michaelIOAppReducer} from '../store/michael-io-app.reducer';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AngularFirestore,
      ],
      imports: [
        StoreModule.forRoot({people: michaelIOAppReducer}),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
      ],
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
