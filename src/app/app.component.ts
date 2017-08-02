import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private backgroundColor: string;

  private MORNING = 0x0649ff;
  private AFTERNOON = 0x06c4ff;
  private EVENING = 0xff0024;
  private NIGHT = 0x000055;

  ngOnInit() {
    this.setNewColor();
    setInterval(() => this.setNewColor(), 1000);
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
    const d = new Date();
    const h = d.getHours();
    const i = 6;
    let p = 0;
    let c1 = 0;
    let c2 = 0;
    if (h < i) {
      p = h / i;
      c1 = this.NIGHT;
      c2 = this.MORNING;
    } else if (h < 2 * i) {
      p = (h - i) / i;
      c1 = this.MORNING;
      c2 = this.AFTERNOON;
    } else if (h < 3 * i) {
      p = (h - 2 * i) / i;
      c1 = this.AFTERNOON;
      c2 = this.EVENING;
    } else {
      p = (h - 3 * i) / i;
      c1 = this.EVENING;
      c2 = this.NIGHT;
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
