import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, Subject, tap } from 'rxjs';
import { SnackbarDuration, SnackbarOptions } from 'src/app/entities/models';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit, OnDestroy {

  snackbar$: Observable<SnackbarOptions> = new Observable();
  visibleSubject: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private service: SnackbarService) {
  }

  ngOnDestroy(): void {
    // this.snackbar$.unsubscribe();
  }

  ngOnInit(): void {
    this.snackbar$ = this.service.getActiveSnackbar();

    this.snackbar$.pipe(
      tap(() => this.visibleSubject.next(true)),
      delay(5000),
      tap(() => this.visibleSubject.next(false))
    ).subscribe();
  }

  actionClicked(callback: () => void) {
    // Call callback
    callback.call(this);
  }


}
