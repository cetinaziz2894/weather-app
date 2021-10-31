import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { dummyCity } from 'src/app/data/dummy-city';
import { City } from 'src/app/models/City';

import { CityComponent } from './city.component';

describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityComponent ],
       imports:[HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
    const city : City = {
      country: "France",
      country_code: "FR",
      name: "Paris",
      city_code:2988507
    };
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    component.city = city;
    component.city_info = dummyCity;
    component.myDate =  yyyy + '-' + mm + '-' + dd;
    component.temperature = Math.round(dummyCity.main.temp);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should city component has city data', () => {
    expect(component.city_info.cod).toBe(200)
    expect(component.city).not.toBeUndefined();
    expect(component.city).not.toBeNull();
    expect(component.city_info.weather).not.toBeUndefined();
    expect(component.city_info.weather).not.toBeNull();
  })

  it('should city component has correct city data', () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    expect(component.city_info.name).toBe(component.city.name)
    expect(component.city_info.id).toBe(component.city.city_code);
    expect(component.myDate).toBe( yyyy + '-' + mm + '-' + dd);
    expect(component.temperature).toBe(21);
  })
});
