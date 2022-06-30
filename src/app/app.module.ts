import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { GalleriesPageComponent } from './pages/galleries-page/galleries-page.component';
import { PhotoGalleryComponent } from './components/photo-gallery/photo-gallery.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GalleryItemComponent } from './components/gallery-item/gallery-item.component';
import { LazyLoadImagesDirectiveDirective } from './directives/lazy-load-images-directive.directive';
import { FormsModule } from '@angular/forms';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { PersonaComponent } from './components/persona/persona.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fa500px, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft, faArrowUp, faChevronLeft, faChevronRight, faHeart, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { CardComponent } from './components/card/card.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { DetailPageNavBarComponent } from './components/detail-page-nav-bar/detail-page-nav-bar.component';
import { MarkdownModule } from 'ngx-markdown';
import { LeafletMapComponent } from './components/map/leaflet-map/leaflet-map.component';
import { LeafletMarkerPopupComponent } from './components/map/leaflet-marker-popup/leaflet-marker-popup.component';
import { PhotoSliderComponent } from './components/photo-slider/photo-slider.component';
import { HomePageComponent } from './pages/home-page/home-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    GalleriesPageComponent,
    PhotoGalleryComponent,
    GalleryItemComponent,
    LazyLoadImagesDirectiveDirective,
    AboutPageComponent,
    PersonaComponent,
    SnackbarComponent,
    BlogPageComponent,
    CardComponent,
    BlogDetailComponent,
    DetailPageNavBarComponent,
    LeafletMapComponent,
    LeafletMarkerPopupComponent,
    PhotoSliderComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    MarkdownModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      fa500px,
      faInstagram,
      faArrowLeft,
      faArrowUp,
      faShareNodes,
      faHeart,
      faChevronLeft,
      faChevronRight
    );
  }
}
