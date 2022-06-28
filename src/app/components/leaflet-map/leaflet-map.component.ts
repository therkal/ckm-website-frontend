import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoLocation } from 'src/app/entities/models';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements AfterViewInit {

  readonly _DEF_MAP_ZOOM_LEVEL: number = 8;

  @Input() geoLocations!: [GeoLocation];

  map!: L.Map;

  constructor() { }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  private loadMap(): void {
    this.initializeIcons();

    this.initializeGeoDataMarkers();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  private initializeGeoDataMarkers() {
    // Get initial location to set map to.
    const firstGeoLocation = this.geoLocations ? this.geoLocations[0] : { lat: 0, lon: 0 };
    this.map = L.map('map').setView([firstGeoLocation.lat, firstGeoLocation.lon], this._DEF_MAP_ZOOM_LEVEL);

    for (let location of this.geoLocations) {
      if (location.lat & location.lon) {
        L.marker([location.lat, location.lon])
          .bindTooltip(location.geoLocationName)
          .openTooltip()
          .addTo(this.map);
      } else {
        console.warn(`Location ${location.geoLocationName} has no lattitude and/or longtitude and will be skipped from rendering.`);
      }

    }
  }

  private initializeIcons() {
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

}
