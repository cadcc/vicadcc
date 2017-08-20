import { Component, OnInit } from '@angular/core';
import { CODE_IMAGES } from './consts';
import {WeatherService} from "./weather.service";

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {


  constructor(private weather: WeatherService) { }

  ngOnInit() {
    setInterval(() => this.weather.getWeatherData(), 1000 * 60 * 60);
    this.weather.getWeatherData();
  }

  public getWeather() {
    return this.weather;
  }

}
