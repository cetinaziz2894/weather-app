import { Component, OnInit } from '@angular/core';
import { CITIES } from 'src/app/data/mock-cities';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  cities = CITIES;

  constructor() {}

  ngOnInit(): void {
  }
}
