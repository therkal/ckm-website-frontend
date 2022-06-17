import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, filter, map, Observable, switchMap, tap, throwError } from 'rxjs';
import { GalleryImage } from 'src/app/entities/models';
import { GalleryService } from 'src/app/services/gallery.service';
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

  constructor(private route: ActivatedRoute, private client: HttpClient, private service: GalleryService) { }

  ngOnInit(): void {
    this.galleryName$ = this.route.paramMap.pipe(map(params => params.get("id"))); // ToDo: Get actual gallery name.

    this.photos$ = this.route.paramMap.pipe(
      // Get the ID from the param map
      map(params => params.get("id")),
      // Filter out the value if it is null 
      filter(id => id !== null),
      // Cast it to string
      map(id => id as string),
      // Switch to another observable to get the data.
      switchMap((id: string) => this.service.getGalleryItems(id))
    );


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
