import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gallery, GalleryImage } from '../entities/models';
import { SnackbarService } from './snackbar.service';
import { TransformService } from './transform.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private client: HttpClient, private transformService: TransformService, private snackbarService: SnackbarService) { }

  getGalleries() {
    return this.client.get<Gallery[]>(environment.assetsBasePath + "galleries.json").pipe(
      map(collection => this.transformService.transformImageUrl(collection))
    );
  }

  getGalleryItems(id: string) {
    return this.client.get<GalleryImage[]>(environment.assetsBasePath + 'gallery-' + id + ".json").pipe(
      // TEMP WHILE HOSTING LOCAL --> Change all occurances of imageUrl to append base path
      map((collection) => this.transformService.transformImageUrl(collection)),
      catchError((error) => of(error)),
      tap((error) => this.snackbarService.showToast({
        message: error.message,
        dismissible: true
      }))
    );
  }
}
