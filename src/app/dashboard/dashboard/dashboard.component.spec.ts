import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DashboardModule} from '../dashboard.module';
import {DashboardComponent} from './dashboard.component';
import {michaelIOAppReducer} from '../../store/michael-io-app.reducer';
import {StoreModule} from '@ngrx/store';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FirebaseService} from '../../services/firebase.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {firebaseConfig} from 'src/environments/environment';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        FirebaseService,
      ],
      declarations: [DashboardComponent],
      imports: [
        DashboardModule,
        StoreModule.forRoot({people: michaelIOAppReducer}),
        NoopAnimationsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
      ],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
