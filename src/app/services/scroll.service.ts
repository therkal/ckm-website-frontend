import { Injectable } from '@angular/core';
import { fromEvent, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  getScrollPercentage(document: Document): Observable<number> {
    return fromEvent(document, 'scroll').pipe(
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
