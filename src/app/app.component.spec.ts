import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AngularFirestore,
      ],
      declarations: [
        AppComponent,
      ],
      imports: [AppModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Michael Simpson'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Michael Simpson');
  });

  it('can write to and read from firestore', (done) => {
    const firestore = TestBed.get(AngularFirestore);
    const messageWrite = 'test_'+Math.random();
    let messageRead = '';
    firestore.collection('test').add({message: messageWrite});
    const people = firestore.collection('test').valueChanges({idField: 'id'}) as Observable<{ message: string; id: string; }[]>;
    // TODO(michaelsimpson): find a better way to typecast res
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    people.pipe(take(1)).subscribe((res)=>{
      messageRead = res[0].message;
      expect(messageWrite === messageRead).toBe(true);
      done();
    });
  });
});
