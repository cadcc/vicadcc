import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-subway',
  templateUrl: './subway.component.html',
  styleUrls: ['./subway.component.scss']
})
export class SubwayComponent implements OnInit {

  private SUB_NAMES = ['Trío de Carnes', 'Pizza', 'Pollo Apanado', 'B.M.T.', 'Costillas BBQ Melt', 'Toscano', 'Jamón de Pavo'];
  private SUB_INGREDIENTS = ['Jamón Ahumado, Jamón de Pollo y Salame', 'Pepperoni, Marinara y Queso', 'Pollo Apanado',
    'Jamón, Salame y Pepperoni', 'Costilla de Cerdo en Salsa BBQ', 'Pepperoni y Salame', 'Jamón de Pavo'];
  private CURRENT_WEEKDAY = 0;

  constructor() {
  }

  ngOnInit() {
    this.CURRENT_WEEKDAY = new Date().getDay() - 1;
    setInterval(() => {
      this.CURRENT_WEEKDAY = new Date().getDay() - 1;
    }, 1000 * 3600);
  }

  public getSubIngredients() {
    return this.SUB_INGREDIENTS[this.CURRENT_WEEKDAY];
  }

  public getSubName() {
    return this.SUB_NAMES[this.CURRENT_WEEKDAY];
  }

  public getSubImage() {
    return '/assets/img/subway/' + this.CURRENT_WEEKDAY + '.jpg';
  }

}
