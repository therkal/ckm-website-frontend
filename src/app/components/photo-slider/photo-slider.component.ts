import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, Subject, Subscription, tap } from 'rxjs';
import { GalleryImage } from 'src/app/entities/models';

@Component({
  selector: 'app-photo-slider',
  templateUrl: './photo-slider.component.html',
  styleUrls: ['./photo-slider.component.scss']
})
export class PhotoSliderComponent implements OnInit, OnDestroy {

  @Input() images$: Observable<GalleryImage[]> = new Observable();
  private imagesSubscription!: Subscription;

  // Holds the currently rendered images (be it visible or invis)
  private rederedImagesSubject: Subject<GalleryImage[]> = new Subject();
  renderedImages$: Observable<GalleryImage[]> = this.rederedImagesSubject.asObservable();

  // Holds the currently active image's index
  private activeImageIndexSubject: Subject<number> = new BehaviorSubject(0);
  activeImageIndex$: Observable<number> = this.activeImageIndexSubject.asObservable();
  activeImageIndex: number = 0;
  // Helper variable to determine if there is a next image
  hasNextImage: boolean = false;

  readonly numberOfImagesToRender = 3;

  // Animating Subject
  private shouldAnimateSubject: Subject<boolean> = new BehaviorSubject(true);
  shouldAnimateCountdown$: Observable<boolean> = this.shouldAnimateSubject.asObservable();

  constructor() {
  }

  ngOnInit(): void {
    this.imagesSubscription = combineLatest([this.activeImageIndex$, this.images$]).pipe(
      tap(([index, images]) => {
        this.hasNextImage = this.activeImageIndex < images.length - 1;

        let i = index !== 0 ? index - 1 : index;
        this.rederedImagesSubject.next(images.slice(i, 2 + index));
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.imagesSubscription) {
      this.imagesSubscription.unsubscribe();
    }
  }

  slideshowAnimationComplete() {
    this.shouldAnimateSubject.next(false);
    if (this.hasNextImage) {
      this.toggleNextImage();
      this.shouldAnimateSubject.next(true);
    }
  }

  togglePreviousImage(): void {
    this.activeImageIndex -= 1;
    this.activeImageIndexSubject.next(this.activeImageIndex);
  }

  toggleNextImage(): void {
    this.activeImageIndex += 1;
    this.activeImageIndexSubject.next(this.activeImageIndex);
  }

}
