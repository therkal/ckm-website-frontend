import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, Subject, Subscription, tap } from 'rxjs';
import { GalleryImage } from 'src/app/entities/models';

@Component({
  selector: 'app-photo-carousel',
  templateUrl: './photo-carousel.component.html',
  styleUrls: ['./photo-carousel.component.scss']
})
export class PhotoCarouselComponent implements OnInit, OnDestroy {

  @Input() images$: Observable<GalleryImage[]> = new Observable();


  private imagesSubscription!: Subscription;
  private rederedImagesSubject: Subject<GalleryImage[]> = new Subject();

  renderedImages$: Observable<GalleryImage[]> = this.rederedImagesSubject.asObservable();
  activeImage$: Observable<GalleryImage> = new Observable();

  activeImageSubject: Subject<number> = new BehaviorSubject(0);
  activeImageIndex$: Observable<number> = this.activeImageSubject.asObservable();
  activeImageIndex: number = 0;

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
        this.rederedImagesSubject.next(images.slice(index, 3 + index));
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
