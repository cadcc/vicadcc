import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DateComponent } from './date/date.component';
import { WeatherComponent } from './weather/weather.component';
import { SubwayComponent } from './subway/subway.component';
import { PostersComponent } from './posters/posters.component';
import { BusComponent } from './bus/bus.component';
import { WeatherService } from './weather/weather.service';
import { MarqueeComponent } from './marquee/marquee.component';

@NgModule({
  declarations: [
    AppComponent,
    DateComponent,
    WeatherComponent,
    SubwayComponent,
    PostersComponent,
    BusComponent,
    MarqueeComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
