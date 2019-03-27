import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {

  private currentTime: string;
  private currentDate: string;
  private currentClassWeek: string;

  private WEEK_1: number;

  private WEEKS_API = 'https://api.cadcc.cl/pantalla/';

  private CLASS_WEEKS: string;


  constructor() {
  }

  ngOnInit() {
    moment.locale('es-ES');
    fetch(this.WEEKS_API).then((response) => {
      return response.json();
    }).then((data) => {
      this.WEEK_1 = data.weekOne;
      this.CLASS_WEEKS = data.weekNames;
      console.log(this.CLASS_WEEKS);
      setInterval(() => {
        this.currentTime = moment().format('HH:mm:ss');
        this.currentDate = moment().format('dddd D [de] MMMM');
        let week = moment().week() - this.WEEK_1;
        week = week < this.CLASS_WEEKS.length ? week : this.CLASS_WEEKS.length - 1;
        this.currentClassWeek = 'Semana ' + this.CLASS_WEEKS[week];
      }, 1000);
    });
  }

  public getCurrentTime() {
    return this.currentTime;
  }

  public getCurrentDate() {
    return this.currentDate;
  }

  public getCurrentClassWeek() {
    return this.currentClassWeek;
  }

}
