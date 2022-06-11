import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GalleriesPageComponent } from './pages/galleries-page/galleries-page.component';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';
import { HttpClientModule } from '@angular/common/http';
import { GalleryItemComponent } from './components/gallery-item/gallery-item.component';
import { LazyLoadImagesDirectiveDirective } from './directives/lazy-load-images-directive.directive';
import { FormsModule } from '@angular/forms';
import { AboutPageComponent } from './pages/about-page/about-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GalleriesPageComponent,
    PhotoGalleryComponent,
    GalleryItemComponent,
    LazyLoadImagesDirectiveDirective,
    AboutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
