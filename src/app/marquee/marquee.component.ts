import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marquee',
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.scss']
})
export class MarqueeComponent implements OnInit {

  private text = '';

  private MARQUEE_API = 'https://api.cadcc.cl/tyaas/';

  constructor() { }

  private getMarqueeData() {
    fetch(this.MARQUEE_API).then((response) => {
      return response.json();
    }).then((data) => {
      this.text = this.generateMarqueeText(data);
    });
  }

  private generateSignText(sign) {
    return '<b>' + sign.nombre +
      '</b> <i>(' + sign.fechaSigno + ')</i> ' +
      '<b>Salud: </b>' + sign.salud + ' ' +
      '<b>Dinero: </b>' + sign.dinero + ' ' +
      '<b>Amor: </b>' + sign.amor + ' ' +
      '<b>Color: </b>' + sign.color + ' ' +
      '<b>Número: </b>' + sign.numero + ' ';
  }

  private generateMarqueeText(signos): string {
    let texto = '';
    if (signos.titulo == null) {
      return "Horóscopo no disponible :("
    } else {
      texto += signos.titulo;
      Object.keys(signos['horoscopo']).forEach((slug) => {
        const signo = signos['horoscopo'][slug];
        texto += ' | ' + this.generateSignText(signo);
      });
      return texto;  
    }
  }

  public getMarqueeText() {
    return this.text;
  }

  ngOnInit() {
    this.getMarqueeData();
    setInterval(() => this.getMarqueeData(), 1000 * 60 * 60 * 8);
  }

}
