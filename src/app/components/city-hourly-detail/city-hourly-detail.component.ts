import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-city-hourly-detail',
  templateUrl: './city-hourly-detail.component.html',
  styleUrls: ['./city-hourly-detail.component.css'],
  providers: [DatePipe]
})
export class CityHourlyDetailComponent implements OnInit {

  @Input() hourly_city_detail: any;
  @Input() city_name: any;
  windDegree: number | undefined;
  temperature!: number;
  calculated: boolean = false;

  constructor(
    private _sanitizer: DomSanitizer,
    private _weatherService: WeatherService,) {
     }

  ngOnInit(): void {
    console.log( "hourly_city_detail",this.hourly_city_detail);
    console.log( "city_name",this.city_name);
    this.windDegree = this.hourly_city_detail.wind.deg;
    this.temperature = this._weatherService.roundNumber(this.hourly_city_detail.main.temp);
  }

  get myTransform(): SafeStyle {
    return this._sanitizer.bypassSecurityTrustStyle(`rotate(${this.windDegree}deg)`);
  }

  calcCelcius = () => {
    this.calculated = !this.calculated;
    return this.temperature =this._weatherService.calcCelcius(this.temperature)
  }

  calcFahrenheit = () => {
    this.calculated = !this.calculated;
    return this.temperature = this._weatherService.calcFahrenheit(this.temperature)
  }

  timestampToDate = (unix_timestamp:number) => {
    return this._weatherService.timestampToDate(unix_timestamp);
  }

}
