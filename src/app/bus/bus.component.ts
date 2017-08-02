import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss']
})
export class BusComponent implements OnInit {

  private BUS_API = 'https://api.cadcc.cl/ts/';
  private services = {};
  private PARADEROS = [
    {codigo: 'PA276', // Club hípico al Sur
    direccion: 'Sur',
    simbolo: 'S'},
    {codigo: 'PA433', // Blanco al oriente
     direccion: 'Oriente',
     simbolo: 'O'},
    {codigo: 'PA322', // Blanco al poniente, 507-121-119
     direccion: 'Norte',
     simbolo: 'N'},
    {codigo: 'PA452', // Blanco al oriente, 510
    direccion: 'Oriente',
     simbolo: 'O'}];
  private currentService = 0;

  constructor() { }

  ngOnInit() {
    this.getBusData();
    setInterval(() => this.getBusData(), 1000 * 60);
    setInterval(() => {
      this.currentService = (this.currentService + 1) % Object.keys(this.services).length;
    }, 1000 * 7);

  }

  private getBusData() {
    const newServices = {};
    this.PARADEROS.forEach((paradero, i, paraderos) => {
      const codigo = paradero['codigo'];
      fetch(this.BUS_API + '?paradero=' + codigo).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(paradero);
        data.servicios.forEach((servicio) => {
          const servicioId = (servicio.servicio + '-' + servicio.direccion);
          if (servicio.valido && !(servicioId in this.services)) {
            servicio.direccion = paradero.direccion;
            servicio.distancia = servicio.distancia.split(' ')[0] + 'm';
            const tiempoSplit = servicio.tiempo.split(' ');
            if (tiempoSplit[0] === 'Menos') {
              servicio.tiempoMin = 0;
              servicio.tiempoMax = 5;
            } else {
              servicio.tiempoMin =  tiempoSplit[1];
              servicio.tiempoMax = tiempoSplit[3];
            }
            this.services[servicioId] = servicio;
            }
        });
        if (paraderos.length === i) {
          this.services = newServices;
        }
      }).catch((ex) => {
        console.error('Error fetching services from ' + codigo, ex);
      });
    });
  }

  public getServicio() {
    if (Object.keys(this.services).length === 0) {
      return '';
    }
    return this.services[Object.keys(this.services)[this.currentService]];
  }

}

