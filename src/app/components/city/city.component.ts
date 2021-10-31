import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-city',
  templateUrl:'./city.component.html' ,
  styleUrls: ['./city.component.css'],
  providers: [DatePipe]
})
export class CityComponent implements OnInit {

  @Input() city: any;
  city_info : any;
  myDate: string | null;
  windDegree: number | undefined;
  temperature!: number;
  calculated: boolean = false;

  constructor(
    private _datePipe: DatePipe, 
    private _weatherService: WeatherService, 
    private _sanitizer: DomSanitizer,
    private _router: Router,
    private spinner: NgxSpinnerService) {
    this.myDate = this._datePipe.transform(new Date(), 'yyyy-MM-dd');
  }

  ngOnInit(): void {
    console.log(this.city);
    this.spinner.show();
    this._weatherService
      .getCity(this.city)
      .subscribe(data => {
        this.city_info = data;
        // console.log("info",this.city_info);
        this.windDegree = 180 - this.city_info.wind.deg;
        this.temperature = this._weatherService.roundNumber(this.city_info.main.temp);
        this.spinner.hide();
      }) 
  }

  get myTransform(): SafeStyle {
    return this._sanitizer.bypassSecurityTrustStyle(`rotate(${this.windDegree}deg)`);
  }

  roundNumber = (number:number) => {
    return Math.round(number);
  }

  calcCelcius = () => {
    this.calculated = !this.calculated;
    return this.temperature = Math.round((this.temperature - 32) * 5 / 9)
  }
  
  calcFahrenheit = () => {
    this.calculated = !this.calculated;
    return this.temperature = Math.round(this.temperature * 9 / 5 + 32)
  }

  //Go to city detail page
  goToCityDetail = () => {
    localStorage.setItem("city_info",JSON.stringify(this.city_info));
    console.log(localStorage.length);
    this._router.navigateByUrl(`/city/${this.city_info.name}`, { state: this.city_info });
  }
}
