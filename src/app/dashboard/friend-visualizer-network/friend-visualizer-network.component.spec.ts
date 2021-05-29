import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendVisualizerNetworkComponent } from './friend-visualizer-network.component';

fdescribe('FriendVisualizerNetworkComponent', () => {
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

  it('should initialize as expected', () => {
    expect(component).toBeTruthy();
  });

  it('should render as expected', () => {
    debugger;
    const nodes = getAllNodes();
    const links = getAllLinks();
    expect(nodes.length === 6).toBe(true);
    expect(links).length === 8).toBe(true);
  });
});
