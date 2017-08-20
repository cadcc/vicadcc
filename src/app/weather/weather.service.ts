import { Injectable } from '@angular/core';
import { CODE_IMAGES } from './consts';

@Injectable()
export class WeatherService {


  private weatherImage = 'clear-day';
  private temperature = 20;
  private sunrise = {hours: 6, minutes: 0};
  private sunset = {hours: 18, minutes: 0};

  private YAHOO_API = 'https://query.yahooapis.com/v1/public/yql?' +
    'q=select%20item.condition,astronomy%20from%20weather.forecast%20' +
    'where%20woeid%20%3D%20349859%20and%20u%20%3D%20%22c%22&format=json' +
    '&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

  constructor() { }

  public getWeatherData() {
    fetch(this.YAHOO_API).then((response) => {
      return response.json();
    }).then((data) => {
      const condition = data.query.results.channel.item.condition;
      const astronomy = data.query.results.channel.astronomy;
      this.weatherImage = CODE_IMAGES[condition.code];
      this.temperature = condition.temp;
      this.sunrise = { hours: astronomy.sunrise.split(':')[0],
                       minutes: astronomy.sunrise.split(':')[1].split(' ')[0]};
      this.sunset = { hours: astronomy.sunset.split(':')[0],
        minutes: astronomy.sunset.split(':')[1].split(' ')[0]};
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
