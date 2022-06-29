import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GalleryImage } from 'src/app/entities/models';
import { GalleryService } from 'src/app/services/gallery.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  images$: Observable<GalleryImage[]> = new Observable();

  constructor(private service: GalleryService) { }

  ngOnInit(): void {
    this.images$ = this.service.getGalleryItems('2022dakota');
  }

}
