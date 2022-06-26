import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { GalleriesPageComponent } from './pages/galleries-page/galleries-page.component';

const routes: Routes = [
  {
    'path': 'gallery', 'component': GalleriesPageComponent
  },
  {
    'path': 'gallery/:id', 'component': PhotoGalleryComponent
  },
  {
    'path': 'about', 'component': AboutPageComponent
  },
  {
    'path': 'blog', 'component': BlogPageComponent
  },
  {
    'path': 'blog/:id', 'component': BlogDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
