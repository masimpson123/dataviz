import { ComponentFixture, TestBed } from '@angular/core/testing';
import { friendLoggerReducer } from '../../store/friend-logger.reducer';
import { StoreModule } from '@ngrx/store';
import { FriendVisualizerComponent } from './friend-visualizer.component';
import { addPerson, reset } from '../../store/friend-logger.actions';
import { Person } from '../../models/Person';

describe('FriendVisualizerComponent', () => {
  let component: FriendVisualizerComponent;
  let fixture: ComponentFixture<FriendVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ StoreModule.forRoot({ people: friendLoggerReducer }), ],
      declarations: [ FriendVisualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize as expected', () => {
    expect(component).toBeTruthy();
  });

  // TODO(michaelsimpson): look into jasmine screendiff options.
  // https://hughmccamphill.com/blog/wdio-image-comparison/
  it('should render as expected', () => {
    component.store.dispatch(reset());
    populateStore();
    // TODO(michaelsimpson): wrap this component in a test host for more realistic
    // binding and change detection.
    // https://angular.io/guide/testing-components-scenarios#component-inside-a-test-host
    component.ngOnChanges();
    const bars = document.querySelectorAll("svg rect");
    // expect one bar for each of the 9 people
    expect(bars.length === 9).toBe(true);
  });

  // TODO(michaelsimpson): pull this out into a test utility
  function populateStore(){
    const person0 = new Person('Theodore',['Henry', 'Brianna', 'Lindsey'],15,160, (Math.random() * 10000));
    const person1 = new Person('Henry',['Hanzel','Thomas','Charles','Theodore','Brianna'],40,170, (Math.random() * 10000));
    const person2 = new Person('Brianna',['Theodore', 'Henry','Natasha', 'Seymore'],29,120, (Math.random() * 10000));
    const person3 = new Person('Natasha',['Brianna'],35,135, (Math.random() * 10000));
    const person4 = new Person('Seymore',['Brianna'],50,200, (Math.random() * 10000));
    const person5 = new Person('Lindsey',['Theodore'],20,140, (Math.random() * 10000));
    const person6 = new Person('Charles',['Henry'],33,176, (Math.random() * 10000));
    const person7 = new Person('Thomas',['Henry'],24,152, (Math.random() * 10000));
    const person8 = new Person('Hanzel',['Henry'],33,175, (Math.random() * 10000));
    component.store.dispatch(addPerson({person:person0}));
    component.store.dispatch(addPerson({person:person1}));
    component.store.dispatch(addPerson({person:person2}));
    component.store.dispatch(addPerson({person:person3}));
    component.store.dispatch(addPerson({person:person4}));
    component.store.dispatch(addPerson({person:person5}));
    component.store.dispatch(addPerson({person:person6}));
    component.store.dispatch(addPerson({person:person7}));
    component.store.dispatch(addPerson({person:person8}));
  }
});
