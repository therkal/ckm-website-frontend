import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { GalleriesPageComponent } from './pages/galleries-page/galleries-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    'path': '', component: HomePageComponent
  },
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
  },
  {
    'path': '404', 'component': NotFoundComponent
  },
  {
    'path': '**', 'redirectTo': '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
