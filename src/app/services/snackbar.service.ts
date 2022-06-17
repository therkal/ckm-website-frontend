import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SnackbarOptions } from '../entities/models';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private activeSnackbarSubject: Subject<SnackbarOptions> = new Subject();

  public getActiveSnackbar() {
    return this.activeSnackbarSubject.asObservable();
  }

  public showToast(options: SnackbarOptions) {
    this.activeSnackbarSubject.next(options);
  }
}
