import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { City } from '../models/City';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private WEATHER_API_SERVER = environment.weatherApi;
  private key = environment.weatherApiKey;

  constructor(private httpClient: HttpClient) { }
  
  // Call City Info
  getCity(city: City): Observable<any>{
    return this.httpClient.get(`${this.WEATHER_API_SERVER}/data/2.5/weather?q=${city.name},${city.country_code}&appid=${this.key}&units=metric`);
  }

  // Call City Hourly Forecast 
  getCityHourlyForecast(cityId:number): Observable<any>{
    return this.httpClient.get(`${this.WEATHER_API_SERVER}/data/2.5/forecast?id=${cityId}&appid=${this.key}&units=metric`)
  }

  // Round Number
  roundNumber = (number:number) => {
    return Math.round(number);
  }

  // Convert Timestamp to Date
  timestampToDate = (unix_timestamp:number) => {
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
  }

  // Convert fahrenheit to celcius
  calcCelcius = (temperature:any) => {
    return Math.round((temperature - 32) * 5 / 9)
  }

// Convert celcius to fahrenheit
  calcFahrenheit = (temperature:any) => {
    return Math.round(temperature * 9 / 5 + 32)
  }

}
