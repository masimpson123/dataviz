import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardModule } from '../dashboard.module';
import { DashboardComponent } from './dashboard.component';
import { friendLoggerReducer } from '../../store/friend-logger.reducer';
import { StoreModule } from '@ngrx/store';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports: [ DashboardModule,
        StoreModule.forRoot({ people: friendLoggerReducer }),
        NoopAnimationsModule
      ]
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
