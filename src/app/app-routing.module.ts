import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleriesPageComponent } from './pages/galleries-page/galleries-page.component';

const routes: Routes = [
  {
    'path': 'gallery', 'component': GalleriesPageComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
