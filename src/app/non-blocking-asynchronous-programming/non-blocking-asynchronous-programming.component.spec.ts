import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonBlockingAsynchronousProgrammingComponent } from './non-blocking-asynchronous-programming.component';

describe('NonBlockingAsynchronousProgrammingComponent', () => {
  let component: NonBlockingAsynchronousProgrammingComponent;
  let fixture: ComponentFixture<NonBlockingAsynchronousProgrammingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonBlockingAsynchronousProgrammingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonBlockingAsynchronousProgrammingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
