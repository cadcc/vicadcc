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
    setInterval(() => {
      const totalBuses = Object.keys(this.services).length;
      const nextService = (this.currentService + 1) % totalBuses;
      if (!isNaN(nextService)) {
        this.currentService = nextService;
        console.log('Mostrando bus ' + (nextService + 1) + ' de ' + totalBuses + '...');
        if (this.currentService === totalBuses - 1) {
          this.getBusData();
        }
      } else {
        this.currentService = 0;
      }
    }, 1000 * 30);

  }

  private getBusData() {
    const newServices = {};
    this.PARADEROS.forEach((paradero, i) => {
      const codigo = paradero['codigo'];
      fetch(this.BUS_API + '?paradero=' + codigo).then((response) => {
        return response.json();
      }).then((data) => {
        data.servicios.forEach((servicio) => {
          const servicioId = (servicio.servicio + '-' + servicio.direccion);
          if (servicio.valido && !(servicioId in newServices)) {
            servicio.direccion = paradero.direccion;
            servicio.distancia = servicio.distancia.split(' ')[0] + 'm';
            const tiempoSplit = servicio.tiempo.split(' ');
            if (tiempoSplit[0] === 'Menos') {
              servicio.tiempoMin = 0;
              servicio.tiempoMax = tiempoSplit[2];
            } else if (tiempoSplit[1] === 'menos') {
              servicio.tiempoMin =  0;
              servicio.tiempoMax = tiempoSplit[3];
            }else {
              servicio.tiempoMin =  tiempoSplit[1];
              servicio.tiempoMax = tiempoSplit[3];
            }
            newServices[servicioId] = servicio;
            }
        });
        if (this.PARADEROS.length === i + 1) {
          console.log('actualizando servicios de Bus...');
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

