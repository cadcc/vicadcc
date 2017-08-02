import { Component, OnInit } from '@angular/core';
import { CODE_IMAGES } from './consts';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  private weatherImage = 'clear-day';
  private temperature = 20;

  private YAHOO_API = 'https://query.yahooapis.com/v1/public/yql?' +
    'q=select%20item.condition%20from%20weather.forecast%20' +
    'where%20woeid%20%3D%20349859%20and%20u%20%3D%20%22c%22&format=json' +
    '&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

  constructor() { }

  ngOnInit() {
    const nextDate = new Date();
    this.getWeatherData();
    if (nextDate.getMinutes() === 0) {
      setInterval(this.getWeatherData, 1000 * 60 * 60);
    } else {
      nextDate.setHours(nextDate.getHours() + 1);
      nextDate.setMinutes(0);
      nextDate.setSeconds(0);

      const difference = nextDate.getTime() - (new Date().getTime());
      setTimeout(() => this.getWeatherData() , difference);
    }
  }


  private getWeatherData() {
    fetch(this.YAHOO_API).then((response) => {
      return response.json();
    }).then((data) => {
      const condition = data.query.results.channel.item.condition;
      this.weatherImage = CODE_IMAGES[condition.code];
      this.temperature = condition.temp;
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

}
