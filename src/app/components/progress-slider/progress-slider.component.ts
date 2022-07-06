import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { animationFrames, map, takeWhile, endWith, Observable, Subscription, tap, switchMap, finalize, filter } from 'rxjs';

@Component({
  selector: 'app-progress-slider',
  templateUrl: './progress-slider.component.html',
  styleUrls: ['./progress-slider.component.scss']
})
export class ProgressSliderComponent {

  @Input() percentage$: Observable<number> = new Observable<number>();
  @Input() hexColor!: string;

  constructor() {
  }

}

