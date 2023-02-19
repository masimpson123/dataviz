import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossOriginCommunicationComponent } from './cross-origin-communication.component';

describe('CrossOriginCommunicationComponent', () => {
  let component: CrossOriginCommunicationComponent;
  let fixture: ComponentFixture<CrossOriginCommunicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossOriginCommunicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossOriginCommunicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
