import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendVisualizerComponent } from './friend-visualizer.component';

describe('FriendVisualizerComponent', () => {
  let component: FriendVisualizerComponent;
  let fixture: ComponentFixture<FriendVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendVisualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
