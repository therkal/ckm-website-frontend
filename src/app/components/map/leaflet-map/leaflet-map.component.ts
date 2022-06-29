import { AfterViewInit, ApplicationRef, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, Injector, Input, OnInit, Output, Type, ViewContainerRef } from '@angular/core';
import * as L from 'leaflet';
import { GeoLocation } from 'src/app/entities/models';
import { environment } from 'src/environments/environment';
import { LeafletMarkerPopupComponent } from '../leaflet-marker-popup/leaflet-marker-popup.component';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements AfterViewInit {

  readonly _DEF_MAP_ZOOM_LEVEL: number = 7;

  @Input() geoLocations!: [GeoLocation];

  map!: L.Map;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private appRef: ApplicationRef
  ) { }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  private loadMap(): void {
    // Generate map
    this.map = L.map('map');

    this.initializeIcons();

    this.initializeGeoDataMarkers();

    L.tileLayer(environment.map.mapImplementationUrl, {
      attribution: environment.map.attribution,
    }).addTo(this.map);
  }

  private initializeGeoDataMarkers() {
    // Create a feature group
    const group = L.featureGroup();
    // Add all GeoData locations on map.
    for (let location of this.geoLocations) {
      let markerPopup: any = this.compilePopup(LeafletMarkerPopupComponent, location);

      if (location.lat & location.lon) {
        group.addLayer(
          L.marker([location.lat, location.lon])
            .bindTooltip(location.geoLocationName)
            .bindPopup(markerPopup, { closeButton: false })
        )
      } else {
        console.warn(`Location ${location.geoLocationName} has no lattitude and/or longtitude and will be skipped from rendering.`);
      }
    }

    // Set map view to bounds of the group.
    this.map.fitBounds(group.getBounds());
    group.addTo(this.map);
  }

  /**
   * Builds the referenced component so it can be injected into the 
   * leaflet map as popup.
   */
  private compilePopup(component: Type<LeafletMarkerPopupComponent>, location: GeoLocation): any {
    const compRef: ComponentRef<LeafletMarkerPopupComponent> = this.viewContainerRef.createComponent(component);
    compRef.instance.geoLocation = location;

    compRef.changeDetectorRef.detectChanges();

    compRef.onDestroy(() => this.appRef.detachView(compRef.hostView));

    let div = document.createElement('div');
    div.appendChild(compRef.location.nativeElement);
    return div;
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
