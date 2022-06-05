import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

//Servicio para mapa
@Injectable({
  providedIn: 'root'
})
export class MapService {
  mapbox = (mapboxgl as typeof mapboxgl);
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  // Coordenadas de la localización donde queremos centrar el mapa
  lat = 37.5638817;
  lng = 126.9245931;
  zoom = 16;
  constructor() {
    mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
    this.mapbox.accessToken = environment.mapBoxToken;
  }
  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    
    const marker1 = new mapboxgl.Marker({color: 'red'})
        .setLngLat([126.9245931, 37.5638817])
        .addTo(this.map);
    }
}