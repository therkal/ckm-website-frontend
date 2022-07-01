import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { animationFrames, map, takeWhile, endWith, Observable, Subscription, tap, switchMap, finalize, filter } from 'rxjs';

@Component({
  selector: 'app-progress-slider',
  templateUrl: './progress-slider.component.html',
  styleUrls: ['./progress-slider.component.scss']
})
export class ProgressSliderComponent implements OnInit, OnDestroy {

  @ViewChild('bar') bar!: ElementRef<HTMLDivElement>;

  @Input() shouldAnimate$: Observable<boolean> = new Observable();

  @Input() duration: number = 4000;
  @Output() hasAnimationCompletedEvent: EventEmitter<boolean> = new EventEmitter()

  animationObservable$: Observable<number>;
  subscription!: Subscription;

  constructor() {
    this.animationObservable$ = this.animateWidthBetween(0, 100, this.duration).pipe(
      // Reset the value of the bar width
      tap(() => this.bar.nativeElement.style.width = `${0}%`),
      finalize(() => {
        this.hasAnimationCompletedEvent.emit(true);
      })
    );
  }

  ngOnInit(): void {
    this.subscription = this.shouldAnimate$
      .pipe(
        // Only switch if it should animate
        filter(shouldAnimate => shouldAnimate === true),
        switchMap(x => this.animationObservable$)
      ).subscribe({
        next: percentage => {
          this.bar.nativeElement.style.width = `${percentage}%`;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Animates the width of a div between 2 percentages for a designated number of time
   * @param start the start percentage
   * @param end the end percentage
   * @param duration how long the effect should last
   */
  animateWidthBetween(start: number, end: number, duration: number): Observable<number> {
    const diff = end - start;
    return animationFrames().pipe(
      // Figure out what percentage of time has passed
      map(({ elapsed }) => elapsed / duration),
      // Take the vector while less than 100%
      takeWhile(v => v < 1),
      // Finish with 100%
      endWith(1),
      // Calculate the distance traveled between start and end
      map(v => v * diff + start)
    );
  }

}
