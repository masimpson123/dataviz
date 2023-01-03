import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgContentTestComponent} from './ng-content-test.component';

describe('NgContentTestComponent', () => {
  let component: NgContentTestComponent;
  let fixture: ComponentFixture<NgContentTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgContentTestComponent],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgContentTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
