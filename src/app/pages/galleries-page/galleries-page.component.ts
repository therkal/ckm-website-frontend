import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Gallery, GalleryItem } from 'src/app/entities/models';
import { TransformService } from 'src/app/services/transform.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-galleries-page',
  templateUrl: './galleries-page.component.html',
  styleUrls: ['./galleries-page.component.scss']
})
export class GalleriesPageComponent implements OnInit {

  galleries: Gallery[] = [];

  constructor(private client: HttpClient, private transformService: TransformService) { }

  ngOnInit(): void {
    this.client.get<GalleryItem[]>(environment.assetsBasePath + "galleries.json").pipe(
      map(collection => this.transformService.transformImageUrl(collection))
    ).subscribe(data => {
      this.galleries = data;
    });
  }

}
