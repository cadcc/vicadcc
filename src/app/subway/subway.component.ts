import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date',
  templateUrl: './subway.component.html',
  styleUrls: ['./subway.component.scss']
})
export class SubwayComponent implements OnInit {

  private SUB_NAMES = ['Trío de Carnes', 'Pizza', 'Pollo Apanado', 'B.M.T.', 'Costillas BBQ Melt', 'Toscano', 'Jamón de Pavo'];
  private SUB_INGREDIENTS = ['Jamón Ahumado, Jamón de Pollo y Salame', 'Pepperoni, Marinara y Queso', 'Pollo Apanado',
    'Jamón, Salame y Pepperoni', 'Costilla de Cerdo en Salsa BBQ', 'Pepperoni y Salame', 'Jamón de Pavo'];

  constructor() {
  }

  ngOnInit() {
    moment.locale('es-ES');
  }

}
