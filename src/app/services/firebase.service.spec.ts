import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseService } from './firebase.service';
import { firebaseConfig } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { friendLoggerReducer } from '../store/friend-logger.reducer';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AngularFirestore,
      ],
      imports: [
        StoreModule.forRoot({ people: friendLoggerReducer }),
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule
      ]
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
