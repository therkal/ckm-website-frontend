import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {

  photos: Observable<any> = new Observable();

  constructor(private route: ActivatedRoute, private client: HttpClient) { }

  ngOnInit(): void {
    this.photos = this.route.paramMap.pipe(
      // Get the ID from the param map
      map(params => params.get("id")),
      // Switch to another observable to get the data.
      switchMap(id => this.client.get('/assets/gallery-' + id + ".json"))
    );
  }

}
