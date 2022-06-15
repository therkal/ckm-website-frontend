import { Component, Input } from '@angular/core';
import { Gallery, GalleryImage } from 'src/app/entities/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery-item',
  templateUrl: './gallery-item.component.html',
  styleUrls: ['./gallery-item.component.scss']
})
export class GalleryItemComponent {

  isLoading = true;

  baseUrl = environment.assetsBasePath;

  @Input() galleryItem!: Gallery | GalleryImage;
  @Input() isGallery = false;

  onLoad() {
    this.isLoading = false;
  }

  isGalleryImage() {
    if ((this.galleryItem as GalleryImage).author) {
      return true;
    }

    return false;
  }

  getAuthor() {
    return this.isGalleryImage() ? (this.galleryItem as GalleryImage).author : null;
  }

}
