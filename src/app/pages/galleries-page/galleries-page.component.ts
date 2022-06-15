import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Gallery, GalleryItem } from 'src/app/entities/models';
import { TransformService } from 'src/app/services/transform.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-galleries-page',
  templateUrl: './galleries-page.component.html',
  styleUrls: ['./galleries-page.component.scss']
})
export class GalleriesPageComponent implements OnInit {

  galleries$: Observable<Gallery[]> = new Observable()

  constructor(private client: HttpClient, private transformService: TransformService) { }

  ngOnInit(): void {
    this.galleries$ = this.client.get<Gallery[]>(environment.assetsBasePath + "galleries.json").pipe(
      map(collection => this.transformService.transformImageUrl(collection))
    );
  }

}
