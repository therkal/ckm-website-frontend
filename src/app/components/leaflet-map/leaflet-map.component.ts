import { AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { GeoLocation } from 'src/app/entities/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements AfterViewInit {

  readonly _DEF_MAP_ZOOM_LEVEL: number = 7;

  @Input() geoLocations!: [GeoLocation];

  map!: L.Map;

  constructor() { }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  private loadMap(): void {
    this.initializeIcons();

    this.initializeGeoDataMarkers();

    L.tileLayer(environment.map.mapImplementationUrl, {
      attribution: environment.map.attribution,
    }).addTo(this.map);
  }

  private initializeGeoDataMarkers() {
    // Get initial location to set map to.
    const firstGeoLocation = this.geoLocations ? this.geoLocations[0] : { lat: 0, lon: 0 };
    this.map = L.map('map');

    // Create a feature group
    const group = L.featureGroup();
    // Add all GeoData locations on map.
    for (let location of this.geoLocations) {
      if (location.lat & location.lon) {
        group.addLayer(
          L.marker([location.lat, location.lon])
            .bindTooltip(location.geoLocationName)
            .addEventListener('click', this.tooltipClicked)
        )
      } else {
        console.warn(`Location ${location.geoLocationName} has no lattitude and/or longtitude and will be skipped from rendering.`);
      }
    }

    // Set map view to bounds of the group.
    this.map.fitBounds(group.getBounds());
    group.addTo(this.map);
  }

  tooltipClicked(e: L.LeafletEvent) {
    console.log("Clicked!", e)
    throw new Error("Not implemented");
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
