import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendVisualizerNetworkComponent } from './friend-visualizer-network.component';

describe('FriendVisualizerNetworkComponent', () => {
  let component: FriendVisualizerNetworkComponent;
  let fixture: ComponentFixture<FriendVisualizerNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendVisualizerNetworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendVisualizerNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
