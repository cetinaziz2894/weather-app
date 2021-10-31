import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityHourlyDetailComponent } from './city-hourly-detail.component';

describe('CityHourlyDetailComponent', () => {
  let component: CityHourlyDetailComponent;
  let fixture: ComponentFixture<CityHourlyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityHourlyDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityHourlyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
