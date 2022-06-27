import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPageNavBarComponent } from './detail-page-nav-bar.component';

describe('DetailPageNavBarComponent', () => {
  let component: DetailPageNavBarComponent;
  let fixture: ComponentFixture<DetailPageNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPageNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPageNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
