import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { dummyCity } from 'src/app/data/dummy-city';
import { dummyCityHourlyInfo } from 'src/app/data/dummy-city-hourly-info';
import { CityHourlyDetailComponent } from '../city-hourly-detail/city-hourly-detail.component';

import { CityDetailComponent } from './city-detail.component';

describe('CityDetailComponent', () => {
  let component: CityDetailComponent;
  let fixture: ComponentFixture<CityDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityDetailComponent, CityHourlyDetailComponent ],
      imports:[HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityDetailComponent);
    component = fixture.componentInstance;
    component.cityWeatherInfo = dummyCityHourlyInfo;
    component.city = dummyCity;
    component.city_name = dummyCity.name;
    component.cityWeatherList = dummyCityHourlyInfo.list.slice(0,8);
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
