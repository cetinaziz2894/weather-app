import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CITIES } from 'src/app/data/mock-cities';
import { City } from 'src/app/models/City';
import { CityComponent } from '../city/city.component';

import { WeatherComponent } from './weather.component';

describe('WeatherComponent', () => {
  let component: WeatherComponent;
  let fixture: ComponentFixture<WeatherComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        WeatherComponent,
        CityComponent
       ],
       imports:[HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render desc in a h2 tag', (() => {
    const fixture = TestBed.createComponent(WeatherComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('This app only shows the weather information of these cities.');
  }));

  it('shoul get cities from mock-cities', () => {
    const cities = CITIES;
    expect(cities).not.toBeUndefined();
    expect(cities).not.toBeNull();
    expect(cities.length).toBe(5);
    expect(cities[0].city_code).toBe(745042);
    expect(cities[0].country).toBe('Turkey');
    expect(cities[0].country_code).toBe('TR');
    expect(cities[0].name).toBe('Istanbul');
  })

  it('should have city component',(() => {
    const cityCompt = fixture.nativeElement.querySelector('app-city');
    fixture.detectChanges();    
    expect(cityCompt).toBeTruthy;
  }));

  it('should city component values are not be empty',(() => {
    const cityCompt = fixture.nativeElement.querySelector('app-city');
    fixture.detectChanges();
    const city_info : City = {
      country: "Turkey",
      country_code: "TR",
      name: "Istanbul",
      city_code:745042
    };
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const compiled = fixture.debugElement.nativeElement;
    const smalls = compiled.querySelectorAll('small');
    const cityCountry = smalls[0]
    const myDate = smalls[1]    
    expect(cityCompt).toBeTruthy;
    expect(cityCountry.textContent).toBe(city_info.country);
    expect(myDate.textContent).toContain( yyyy + '-' + mm + '-' + dd);
  }));
});

