import { inject, TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { dummyCity } from '../data/dummy-city';
import { environment } from 'src/environments/environment';
import { City } from '../models/City';
import { dummyCityHourlyInfo } from '../data/dummy-city-hourly-info';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create',
    inject([WeatherService], (service: WeatherService) => {
      expect(service).toBeTruthy();
    }));

  it('should retrieve city info from API via GET', () => {
    const cityDummyInfo = dummyCity

    const city: City = {
      country: "France",
      country_code: "FR",
      name: "Paris",
      city_code:2988507
    };
    service.getCity(city).subscribe( cityInfo => {
      expect(cityInfo.cod).toBe(200)
      expect(cityInfo).not.toBeUndefined();
      expect(cityInfo).not.toBeNull();
      expect(cityInfo.weather.length).toBe(1)
      expect(cityInfo.name).toBe(city.name)
      expect(cityInfo.sys.country).toBe(city.country_code)
      expect(cityInfo).toEqual(cityDummyInfo)
    });

    const request = httpMock.expectOne(`${environment.weatherApi}/data/2.5/weather?q=${city.name},${city.country_code}&appid=${environment.weatherApiKey}&units=metric`);
    expect(request.request.method).toBe('GET');
    request.flush(cityDummyInfo);
  })

  it('should retrive city hourly forecast from API via GET', () => {
    const cityDummyHoutlryInfo = dummyCityHourlyInfo
    const city = {
      country:"France",
      country_code:"FR",
      name:"Paris",
      city_code:2988507
    }

    service.getCityHourlyForecast(city.city_code).subscribe( cityHourlyInfo => {
      expect(cityHourlyInfo.cod).toBe('200')
      expect(cityHourlyInfo).not.toBeUndefined();
      expect(cityHourlyInfo).not.toBeNull();
      expect(cityHourlyInfo.city.name).toBe(city.name)
      expect(cityHourlyInfo.city.country).toBe(city.country_code)
      expect(cityHourlyInfo.city.id).toBe(city.city_code)
      expect(cityHourlyInfo.list.length).toBeGreaterThan(0)
    });

    const request = httpMock.expectOne(`${environment.weatherApi}/data/2.5/forecast?id=${city.city_code}&appid=${environment.weatherApiKey}&units=metric`);
    expect(request.request.method).toBe('GET');
    request.flush(cityDummyHoutlryInfo);
  })

  it('should return rounded number', () => {
    const number : number = 22.15;
    const newNumber = service.roundNumber(number);
    expect(newNumber).not.toBeUndefined();
    expect(newNumber).not.toBeNull();
    expect(newNumber).toBe(22);
  })

  it('should convert timestamp to Date', () => {
    const timestamp : number = 1622624400;
    const newTimestamp = service.timestampToDate(timestamp);
    expect(newTimestamp).not.toBeUndefined();
    expect(newTimestamp).not.toBeNull();
    expect(newTimestamp).toBe("12:00");
  })
  
  it('should calculate fahrenheit to celcius', () => {
    const degree : number = 75;
    const newDegree = service.calcCelcius(degree);
    expect(newDegree).not.toBeUndefined();
    expect(newDegree).not.toBeNull();
    expect(newDegree).toBe(24);
  })

  it('should calculate celcius to fahrenheit', () => {
    const degree : number = 24;
    const newDegree = service.calcFahrenheit(degree);
    expect(newDegree).not.toBeUndefined();
    expect(newDegree).not.toBeNull();
    expect(newDegree).toBe(75);
  })



});
