import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { animationFrames, BehaviorSubject, combineLatest, map, Observable, Subject, tap, takeWhile, endWith, finalize, switchMap, filter, takeUntil } from 'rxjs';
import { GalleryImage, PhotoSliderOptions } from 'src/app/entities/models';

@Component({
  selector: 'app-photo-slider',
  templateUrl: './photo-slider.component.html',
  styleUrls: ['./photo-slider.component.scss']
})
export class PhotoSliderComponent implements OnInit, OnDestroy {

  // Input an observable with the number images to display in the slideshow.
  @Input() images$: Observable<GalleryImage[]> = new Observable();

  @Input() options!: PhotoSliderOptions;

  // Holds the currently rendered images (be it visible or invis)
  private rederedImagesSubject: Subject<GalleryImage[]> = new Subject();
  renderedImages$: Observable<GalleryImage[]> = this.rederedImagesSubject.asObservable();

  // Holds the currently active image's index
  private activeImageIndexSubject: Subject<number> = new BehaviorSubject(0);
  activeImageIndex$: Observable<number> = this.activeImageIndexSubject.asObservable();
  activeImageIndex: number = 0;
  // Helper variable to determine if there is a next image
  hasNextImage: boolean = false;

  // Holds the values whether this component emits an event to its child to start animating the countdown.
  private shouldAnimateSubject: Subject<boolean> = new BehaviorSubject(false);
  shouldAnimate$: Observable<boolean> = this.shouldAnimateSubject.asObservable();

  slideshowAnimationPercentageSubject: Subject<number> = new BehaviorSubject(0);
  slideshowAnimationPercentage$: Observable<number> = this.slideshowAnimationPercentageSubject.asObservable();

  private readonly destroy$: Subject<boolean> = new Subject();
  private readonly animationObservableDestroyed$: Subject<boolean> = new Subject();

  componentHeight: number = 500;

  constructor() {
  }

  ngOnInit(): void {
    combineLatest([this.activeImageIndex$, this.images$]).pipe(
      tap(([index, images]) => {
        this.hasNextImage = this.activeImageIndex < images.length - 1;

        let i = index !== 0 ? index - 1 : index;
        this.rederedImagesSubject.next(images.slice(i, 2 + index));
      }),
      takeUntil(this.destroy$)
    ).subscribe();

    // Slideshow
    if (this.options && this.options.slideshow) {
      const animationDuration = this.options.slideshow.duration ? this.options.slideshow.duration : 6000;
      const animationObservable$ = this.animateWidthBetween(0, 100, animationDuration).pipe(
        tap((percentage) => this.slideshowAnimationPercentageSubject.next(percentage)),
        finalize(() => this.slideshowAnimationComplete())
      )

      this.shouldAnimate$.pipe(
        filter(shouldAnimate => shouldAnimate === true),
        switchMap(() => animationObservable$),
        tap(percentage => {
          if (percentage === 100 && this.hasNextImage) {
            this.toggleNextImage();
          }
        }),
        takeUntil(this.destroy$)
      ).subscribe();

      // Start the animations
      this.shouldAnimateSubject.next(true);
    }

    this.componentHeight = this.options.height ? this.options.height : 500;
  }

  dotClicked(imageIndex: number) {
    this.activeImageIndex = imageIndex;
    this.activeImageIndexSubject.next(this.activeImageIndex);

    if (this.options.slideshow) {
      this.animationObservableDestroyed$.next(true);
      this.shouldAnimateSubject.next(true);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /**
   * Slideshow animation complete method.
   * Toggles next image if available, and restarts loop.
   */
  slideshowAnimationComplete() {
    this.shouldAnimateSubject.next(false);

    if (this.hasNextImage) {
      // Reset percentage
      this.slideshowAnimationPercentageSubject.next(0);
    }
  }


  /**
   * Toggles previous image
   * ToDo: On slideshow, restart countdown
   */
  togglePreviousImage(): void {
    this.activeImageIndex -= 1;
    this.activeImageIndexSubject.next(this.activeImageIndex);

    if (this.options.slideshow) {
      this.animationObservableDestroyed$.next(true);
      this.shouldAnimateSubject.next(true);
    }


  }

  /**
   * Toggles next image
   * * ToDo: On slideshow, restart countdown
   */
  toggleNextImage(): void {
    this.activeImageIndex += 1;
    this.activeImageIndexSubject.next(this.activeImageIndex);

    if (this.options.slideshow) {
      this.animationObservableDestroyed$.next(true);
      this.shouldAnimateSubject.next(true);
    }
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
      takeUntil(this.animationObservableDestroyed$),
      // Calculate the distance traveled between start and end
      map(v => v * diff + start)
    );
  }

}
