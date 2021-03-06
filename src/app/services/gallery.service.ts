import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gallery, GalleryImage } from '../entities/models';
import { TransformService } from './transform.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private client: HttpClient, private transformService: TransformService) { }

  getGalleries() {
    return this.client.get<Gallery[]>(environment.assetsBasePath + "galleries.json").pipe(
      map(collection => this.transformService.transformImageUrl(collection))
    );
  }

  getGalleryItems(id: string): Observable<GalleryImage[]> {
    return this.client.get<GalleryImage[]>(environment.assetsBasePath + 'gallery-' + id + ".json").pipe(
      // ToDo: Remove map
      // TEMP WHILE HOSTING LOCAL --> Change all occurances of imageUrl to append base path
      map((collection) => this.transformService.transformImageUrl(collection))
    );
  }
}
