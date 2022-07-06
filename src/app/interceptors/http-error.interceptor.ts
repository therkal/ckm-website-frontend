import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackbarService: SnackbarService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // ToDo: Change behaviour based on usecase.
      tap({
        next: () => null,
        error: (e: HttpErrorResponse) => {
          this.snackbarService.showToast({
            message: e.message,
            dismissible: true
          })
        }
      })
    );
  }
}
