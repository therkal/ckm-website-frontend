import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafletMarkerPopupComponent } from './leaflet-marker-popup.component';

describe('LeafletMarkerPopupComponent', () => {
  let component: LeafletMarkerPopupComponent;
  let fixture: ComponentFixture<LeafletMarkerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeafletMarkerPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeafletMarkerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
