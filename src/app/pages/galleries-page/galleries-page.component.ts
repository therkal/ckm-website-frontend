import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Gallery } from 'src/app/entities/models';
import { Observable } from 'rxjs';
import { GalleryService } from 'src/app/services/gallery.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-galleries-page',
  templateUrl: './galleries-page.component.html',
  styleUrls: ['./galleries-page.component.scss']
})
export class GalleriesPageComponent implements OnInit {

  galleries$: Observable<Gallery[]> = new Observable()

  constructor(private client: HttpClient, private service: GalleryService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.galleries$ = this.service.getGalleries();
  }

}
