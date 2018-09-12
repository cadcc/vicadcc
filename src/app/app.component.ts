import {Component, OnInit} from '@angular/core';
import {WeatherService} from './weather/weather.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private backgroundColor: string;


  // sunrise-start (sunrise-1h), morning (sunrise), afternoon((sunrise+sunset)/2), sunset-start(sunset-1h), night (sunset)
  // private SKY_COLORS = [0xff1194, 0x0649ff, 0x06c4ff, 0xff0024, 0x000055];

  private SKY_COLORS = [0x000055, 0xff1194, 0x0649ff, 0xff0024];


  constructor(private weather: WeatherService) { }

  ngOnInit() {
    this.setNewColor();
    setInterval(() => this.setNewColor(), 1000);
    setInterval(() => window.location.reload(), 1000*60*60*24);
  }


  private colorTransition(a: number, b: number, p: number): number {
    const r1 = Math.floor(a / (256 * 256));
    const g1 = Math.floor((a - r1 * 256 * 256) / 256);
    const b1 = (a - r1 * 256 * 256 - g1 * 256);
    const r2 = Math.floor(b / (256 * 256));
    const g2 = Math.floor((b - r2 * 256 * 256) / 256);
    const b2 = (b - r2 * 256 * 256 - g2 * 256);
    const r3 = Math.floor(r2 * p) + Math.floor(r1 * (1 - p));
    const g3 = Math.floor(g2 * p) + Math.floor(g1 * (1 - p));
    const b3 = Math.floor(b2 * p) + Math.floor(b1 * (1 - p));
    return r3 * 256 * 256 + g3 * 256 + b3;
  }

  private setNewColor() {
    const sunrise = this.weather.getSunrise();
    const sunset = this.weather.getSunset();
    const sunriseDate = moment().hours(sunrise.hours).minutes(sunrise.minutes);
    const sunsetDate = moment().hours(sunset.hours).minutes(sunset.minutes);
    const preSunriseDate = sunriseDate.subtract(1, 'hour');
    const preSunsetDate = sunsetDate.subtract(1, 'hour');

    const d = new Date();
    const h = d.getHours();
    const i = 6;
    let p = 0;
    let c1 = 0;
    let c2 = 0;
    if (h < i) {
      p = h / i;
      c1 = this.SKY_COLORS[0];
      c2 = this.SKY_COLORS[1];
    } else if (h < 2 * i) {
      p = (h - i) / i;
      c1 = this.SKY_COLORS[1];
      c2 = this.SKY_COLORS[2];
    } else if (h < 3 * i) {
      p = (h - 2 * i) / i;
      c1 = this.SKY_COLORS[2];
      c2 = this.SKY_COLORS[3];
    } else {
      p = (h - 3 * i) / i;
      c1 = this.SKY_COLORS[3];
      c2 = this.SKY_COLORS[0];
    }
    this.backgroundColor = this.colorTransition(c1, c2, p).toString(16);
  }



  public getBackgroundColor() {
    let color = '' + this.backgroundColor;
    while (color.length < 6) {
      color = '0' + color;
    }
    return '#' + color;
  }
}
