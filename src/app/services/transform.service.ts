import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransformService {

  /**
   * ToDo: Remove this method!
   * This is a temporary method to transform imageUrls while the images all reside in assets
   * @param items A collection that has items with the property imageUrl
   * @returns transformed imageUrl
   */
  transformImageUrl(items: any[]) {
    return items.map((item) => {
      item.imageUrl = environment.assetsBasePath + item.imageUrl;
      return item;
    });
  }
}
