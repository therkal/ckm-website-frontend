import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, delayWhen, map, Observable, Subject, Subscription, tap, timer } from 'rxjs';
import { SnackbarDuration, SnackbarOptions } from 'src/app/entities/models';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit, OnDestroy {

  private readonly _shortSnackbarDurationTimeInMs = 2500;
  private readonly _intermediateSnackbarDurationTimeInMs = 5000;
  private readonly _longSnackbarDurationTimeInMs = 10000;

  private readonly _defaultSnackbarDuration = this._intermediateSnackbarDurationTimeInMs;

  private _durationMap: Map<SnackbarDuration, number> = new Map([
    [SnackbarDuration.SHORT, this._shortSnackbarDurationTimeInMs],
    [SnackbarDuration.INTERMEDIATE, this._intermediateSnackbarDurationTimeInMs],
    [SnackbarDuration.LONG, this._longSnackbarDurationTimeInMs]
  ])

  snackbar$: Observable<SnackbarOptions> = new Observable();
  visibleSubject: Subject<boolean> = new BehaviorSubject<boolean>(false);
  private snackbarSubscription = new Subscription();

  constructor(private service: SnackbarService) {
  }

  ngOnInit(): void {
    this.snackbar$ = this.service.getActiveSnackbar();

    this.snackbarSubscription = this.snackbar$.pipe(
      // Toggle visibiliy
      tap(() => this.visibleSubject.next(true)),
      // Get duration
      map((options: SnackbarOptions) => this.getSnackbarDuration(options.duration)),
      // Delay if duration is found
      delayWhen((x: number) => timer(x)),
      // Toggle visibility
      tap(() => {
        this.visibleSubject.next(false)
      })
    ).subscribe();
  }

  /**
   * Destroy the active subscriptions
   */
  ngOnDestroy(): void {
    this.snackbarSubscription.unsubscribe();
  }

  actionClicked(callback: () => void) {
    // Call callback
    callback.call(this);
  }

  dismissClicked() {
    this.visibleSubject.next(false);
  }

  /**
   * Private method to determine the duration the snackbar should display in MS
   * @param snackbarOptionsDuration The Snackbar Durations options that was passed. 
   * @returns (Number) time in MS
   * @returns if snackbarOptionsDuration undefined --> the default snackbar duration, otherwise a value that is defined in the map
   */
  private getSnackbarDuration(snackbarOptionsDuration: SnackbarDuration | undefined): number {
    const result: number | undefined = snackbarOptionsDuration !== undefined ?
      this._durationMap.get(snackbarOptionsDuration) : this._defaultSnackbarDuration;

    return result ? result : this._defaultSnackbarDuration;
  }

}
