import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss']
})
export class GalleryItemComponent implements OnInit {

  isLoading: Boolean = true;

  @Input() galleryItem: any;
  @Input() isGallery: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onLoad() {
    this.isLoading = false;
  }

}
