import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { fromEvent, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  getScrollPercentage(): Observable<number> {
    return fromEvent(this.document, 'scroll').pipe(
      map((e: any) => {
        const document = e.target as Document;
        const scrollingElement: any = document.scrollingElement;

        const scrollTop = scrollingElement ? scrollingElement.scrollTop : 0;
        const scrollHeight = scrollingElement ? scrollingElement.scrollHeight : 0;


        return scrollTop / (scrollHeight - scrollingElement.clientHeight) * 100
      })
    )
  }
}
