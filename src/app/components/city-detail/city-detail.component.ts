import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css']
})

export class CityDetailComponent implements OnInit {
  city: any;
  city_name: any;
  cityWeatherInfo:any;
  cityWeatherList: any;
  localData: any;
  city_id: any;

  nextBtn: boolean = true;
  prevBtn: boolean = true;
  cityCardWidth: number = 0;

  @ViewChild('detailList')
  list!: ElementRef;

  constructor(
    private _weatherService: WeatherService,
    private spinner: NgxSpinnerService
    ) {
    this.localData = localStorage.getItem("city_info");       
  }
  
  ngOnInit(): void {
    this.city = (history.state.id) ? history.state : JSON.parse(this.localData);
    this.city_id = (history.state.id) ? history.state.id : JSON.parse(this.localData).sys?.id;
    if (this.city_id) {
      this.spinner.show();
      this._weatherService
      .getCityHourlyForecast(this.city.id)
      .subscribe(data => {
        this.cityWeatherInfo = data;
        console.log(this.cityWeatherInfo);        
        this.cityWeatherList = this.cityWeatherInfo?.list.slice(0,8);
        this.spinner.hide();
      })
    }
    this.city_name = this.city.name.toLowerCase();  
  }

  ngAfterViewInit() {
    //Take city card width
    this.cityCardWidth =  this.list.nativeElement.clientWidth/4;
  }

  //Timestamp Converts To Date
  timestampToDate = (unix_timestamp:number) => {
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }

  // Carousel Prev Button
  prev(el: HTMLElement) {
    this.nextBtn = true;
    console.log(el.scrollLeft);
    if (el.scrollLeft - this.cityCardWidth <= 0) {
      el.scrollLeft -= this.cityCardWidth;
      console.log("girdi prev");
      this.prevBtn = false;
    }else{
      el.scrollLeft -= this.cityCardWidth;
    }
  }

  // Carousel Next Button
  next(el: HTMLElement) {
    this.prevBtn = true;
    console.log(el.scrollLeft);
    // let childWidth:number = el?.firstElementChild?.scrollWidth;
    if (el.scrollLeft + this.cityCardWidth >= el.offsetWidth ) {
      console.log("girdi next");
      el.scrollLeft += this.cityCardWidth;
      this.nextBtn = false;
    }else{
      el.scrollLeft += this.cityCardWidth;
    }
  }
}

