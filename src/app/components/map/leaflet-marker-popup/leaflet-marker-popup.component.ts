import { Component, Input } from '@angular/core';
import { GeoLocation } from 'src/app/entities/models';

@Component({
  selector: 'app-leaflet-marker-popup',
  templateUrl: './leaflet-marker-popup.component.html',
  styleUrls: ['./leaflet-marker-popup.component.scss']
})
export class LeafletMarkerPopupComponent {

  @Input() geoLocation!: GeoLocation

}
