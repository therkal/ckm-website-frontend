import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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

  activeImage$: Observable<GalleryImage> = new Observable();
  private activeImageSubject: Subject<number> = new BehaviorSubject(0);
  activeImageIndex$: Observable<number> = this.activeImageSubject.asObservable();
  activeImageIndex: number = 0;

  private previousImageSubject: Subject<GalleryImage | undefined> = new BehaviorSubject<GalleryImage | undefined>(undefined);
  previousImage$: Observable<GalleryImage | undefined> = this.previousImageSubject.asObservable();

  private nextImageSubject: Subject<GalleryImage | undefined> = new BehaviorSubject<GalleryImage | undefined>(undefined);
  nextImage$: Observable<GalleryImage | undefined> = this.previousImageSubject.asObservable();

  numberOfImages: number = 0;
  hasNextImage: boolean = false;

  readonly numberOfImagesToRender = 3;

  constructor() {
  }

  ngOnInit(): void {

    this.activeImage$ = combineLatest([this.activeImageIndex$, this.images$]).pipe(
      tap(([index, images]) => {
        this.numberOfImages = images.length;
        this.hasNextImage = this.activeImageIndex < images.length - 1;

        let i = index !== 0 ? index - 1 : index;
        this.rederedImagesSubject.next(images.slice(i, 2 + index));

        this.previousImageSubject.next(images[index + 1]);
        this.nextImageSubject.next(images[index + 1]);
      }),
      map(([index, images]) => {
        return images[index]
      })
    );

    this.imagesSubscription = this.activeImage$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.imagesSubscription) {
      this.imagesSubscription.unsubscribe();
    }
  }

  previousImage(): void {
    this.activeImageIndex -= 1;
    this.activeImageSubject.next(this.activeImageIndex);
  }

  nextImage(): void {
    this.activeImageIndex += 1;
    this.activeImageSubject.next(this.activeImageIndex);
  }

}
