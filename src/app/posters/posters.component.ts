import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrls: ['./posters.component.scss']
})
export class PostersComponent implements OnInit {

  private POSTER_API = 'https://www.cadcc.cl/wp-json/wp/v2/posts?per_page=10&categories=91';
  private AFICHES_API = 'https://www.u-cursos.cl/api/0/ingenieria/2/afiches/todos?pagina=1';
  private posters = [];
  private currentPoster = 0;

  constructor() { }

  ngOnInit() {
    this.getPosterData();
    setInterval(() => this.getPosterData(), 1000 * 60 * 5);
    setInterval(() => {
      this.currentPoster = (this.currentPoster + 1) % this.posters.length;
    }, 1000 * 20);

  }

  private getPosterData() {
    fetch(this.POSTER_API).then((response) => {
      return response.json();
    }).then((data) => {
      while (this.posters.length > 0) {
        this.posters.pop();
      }
      if (data) {
        data.forEach((post) => {
          if (post.screenLimitDate !== '') {
            const limitDate = moment(post.screenLimitDate);
            if (moment() > limitDate) {
              return;
            }
          }
          if ('better_featured_image' in post && post['better_featured_image'] != null) {
            this.posters.push(post['better_featured_image']['source_url']);
          }
        });
      } else {
        this.posters.push('/assets/img/AficheDefault.png');
      }
    });
  }

  public getPosterImage() {
    if (this.posters.length === 0) {
        return '';
    }
    return this.posters[this.currentPoster];
  }

}
