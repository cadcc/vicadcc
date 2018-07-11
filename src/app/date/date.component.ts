import { Component, OnInit } from '@angular/core';
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

  private CLASS_WEEKS = ['1', '2', '3', '4', '5', '6', '7', 'de Vacaciones', 'Olímpica', '8', '9', '10',
    '11', 'de Vacaciones 1', 'de Vacaciones 2', '12', '13', '14', '15', 'de Exámenes', 'de IA', '1', '2',
    '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', 'de Exámenes',];

  constructor() { }

  ngOnInit() {
    moment.locale('es-ES');
    this.WEEK_1 = 38;
    setInterval(() => {
      this.currentTime = moment().format('HH:mm:ss');
      this.currentDate = moment().format('dddd D [de] MMMM');
      let week = moment().week() - this.WEEK_1;
      week = week < this.CLASS_WEEKS.length ? week : this.CLASS_WEEKS.length - 1;
      this.currentClassWeek = 'Semana ' + this.CLASS_WEEKS[week];
    }, 1000);
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
