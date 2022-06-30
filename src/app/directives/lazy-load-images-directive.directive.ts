import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: 'img[lazy-loading]' })
export class LazyLoadImagesDirectiveDirective {

  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    } else {
      // ToDo: Implementation for unsupported browsers?
      // ToDo: Intersection Observer is an alternative way.
    }
  }

}
