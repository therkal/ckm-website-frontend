import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-page-nav-bar',
  templateUrl: './detail-page-nav-bar.component.html',
  styleUrls: ['./detail-page-nav-bar.component.scss']
})
export class DetailPageNavBarComponent {

  @Input() title$: Observable<string | null> = new Observable();
  @Input() title: string | undefined = '';

  constructor() { }

}
