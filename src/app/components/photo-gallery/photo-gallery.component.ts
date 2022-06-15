import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { GalleryImage } from 'src/app/entities/models';
import { TransformService } from 'src/app/services/transform.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {

  galleryName$: Observable<string | null> = new Observable();
  photos$: Observable<GalleryImage[]> = new Observable();

  constructor(private route: ActivatedRoute, private client: HttpClient, private transformService: TransformService) { }

  ngOnInit(): void {
    this.galleryName$ = this.route.paramMap.pipe(map(params => params.get("id"))); // ToDo: Get actual gallery name.

    this.photos$ = this.route.paramMap.pipe(
      // Get the ID from the param map
      map(params => params.get("id")),
      // Switch to another observable to get the data.
      switchMap(id => this.client.get<GalleryImage[]>(environment.assetsBasePath + 'gallery-' + id + ".json")),
      // TEMP WHILE HOSTING LOCAL --> Change all occurances of imageUrl to append base path
      map((collection) => this.transformService.transformImageUrl(collection)));
  }

  // ToDo: extract to generic component.
  backToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
