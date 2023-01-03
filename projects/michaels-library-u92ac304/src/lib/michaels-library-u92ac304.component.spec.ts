import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MichaelsLibraryU92ac304Component} from './michaels-library-u92ac304.component';

describe('MichaelsLibraryU92ac304Component', () => {
  let component: MichaelsLibraryU92ac304Component;
  let fixture: ComponentFixture<MichaelsLibraryU92ac304Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MichaelsLibraryU92ac304Component],
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MichaelsLibraryU92ac304Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
