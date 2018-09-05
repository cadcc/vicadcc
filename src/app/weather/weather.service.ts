import { Injectable } from '@angular/core';
import { CODE_IMAGES } from './consts';

@Injectable()
export class WeatherService {


  private weatherImage = 'default';
  private temperature = 99;
  private sunrise = {hours: 6, minutes: 0};
  private sunset = {hours: 18, minutes: 0};
  private DARKSKY_API = 'https://api.cadcc.cl/tiempo/';


  constructor() { }

  public getWeatherData() {
    fetch(this.DARKSKY_API).then((response) => {
      return response.json();
    }).then((data) => {
      this.weatherImage = (Object.keys(CODE_IMAGES).indexOf(data.currently.icon) !== -1) ? CODE_IMAGES[data.currently.icon] : 'default';
      this.temperature = Math.round((data.currently.temperature - 32) * 5 / 9);
      this.sunrise = { hours: new Date(data.daily.data.sunriseTime * 1000).getHours(),
                       minutes: new Date(data.daily.data.sunriseTime * 1000).getMinutes()};
      console.log(data.daily.data);
      this.sunset = { hours: new Date(data.daily.data.sunsetTime * 1000).getHours(),
        minutes: new Date(data.daily.data.sunsetTime * 1000).getMinutes()};
    }).catch((ex) => {
      console.error('Error fetching forecast', ex);
    });
  }

  public getWeatherImage() {
    return '/assets/img/weather/' + this.weatherImage + '.png';
  }

  public getTemperature() {
    return this.temperature + '°';
  }

  public getSunrise() {
    return this.sunrise;
  }

  public getSunset() {
    return this.sunset;
  }

}
