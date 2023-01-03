import {ComponentFixture, TestBed} from '@angular/core/testing';
import {michaelIOAppReducer} from '../../store/michael-io-app.reducer';
import {Store, StoreModule} from '@ngrx/store';
import {DataVisualizerComponent} from './data-visualizer.component';
import {addPersonSuccess, reset} from '../../store/michael-io-app.actions';
import {Person} from '../../models/Person';

describe('DataVisualizerComponent', () => {
  let component: DataVisualizerComponent;
  let fixture: ComponentFixture<DataVisualizerComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({people: michaelIOAppReducer})],
      declarations: [DataVisualizerComponent],
    })
        .compileComponents();
    store = TestBed.get(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize as expected', () => {
    expect(component).toBeTruthy();
  });

  // TODO(michaelsimpson): look into jasmine screendiff options.
  // https://hughmccamphill.com/blog/wdio-image-comparison/
  it('should render as expected', () => {
    component.people = populateStore();
    // TODO(michaelsimpson): wrap this component in a test host for more realistic
    // binding and change detection.
    // https://angular.io/guide/testing-components-scenarios#component-inside-a-test-host
    component.ngOnChanges();
    const bars = document.querySelectorAll('svg rect');
    // expect one bar for each of the 9 people
    expect(bars.length === 9).toBe(true);
  });

  // TODO(michaelsimpson): pull this out into a test utility
  function populateStore():Map<string, Person> {
    const people = new Map<string, Person>();
    people.set('Theodore', new Person('Theodore', ['Henry', 'Brianna', 'Lindsey'], 15, 'bingo', (Math.random() * 100_000)));
    people.set('Henry', new Person('Henry', ['Hanzel', 'Thomas', 'Charles', 'Theodore', 'Brianna'], 40, 'bingo2', (Math.random() * 100_000)));
    people.set('Brianna', new Person('Brianna', ['Theodore', 'Henry', 'Natasha', 'Seymore'], 29, 'bingo3', (Math.random() * 100_000)));
    people.set('Natasha', new Person('Natasha', ['Brianna'], 35, 'bingo4', (Math.random() * 100_000)));
    people.set('Seymore', new Person('Seymore', ['Brianna'], 50, 'bingo5', (Math.random() * 100_000)));
    people.set('Lindsey', new Person('Lindsey', ['Theodore'], 20, 'bingo6', (Math.random() * 100_000)));
    people.set('Charles', new Person('Charles', ['Henry'], 33, 'bingo7', (Math.random() * 100_000)));
    people.set('Thomas', new Person('Thomas', ['Henry'], 24, 'bingo8', (Math.random() * 100_000)));
    people.set('Hanzel', new Person('Hanzel', ['Henry'], 33, 'bingo9', (Math.random() * 100_000)));
    return people;
  }
});
