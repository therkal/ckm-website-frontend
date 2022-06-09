import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';
import { GalleriesPageComponent } from './pages/galleries-page/galleries-page.component';

const routes: Routes = [
  {
    'path': 'gallery', 'component': GalleriesPageComponent
  }, 
  {
    'path': 'gallery/:id', 'component': PhotoGalleryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
