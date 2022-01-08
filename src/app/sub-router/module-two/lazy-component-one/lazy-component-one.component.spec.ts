import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyComponentOneComponent } from './lazy-component-one.component';

describe('LazyComponentOneComponent', () => {
  let component: LazyComponentOneComponent;
  let fixture: ComponentFixture<LazyComponentOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LazyComponentOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyComponentOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
