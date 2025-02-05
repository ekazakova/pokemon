import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private router: Router = inject(Router);
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          console.error('An error occurred:', error);
          this.router.navigate(['/error/500']);
        } else if (error.status === 404) {
          console.error('Resource nor found:', error);
          this.router.navigate(['/error/404']);
        }
        
        return throwError(() => error);
      })
    );
  }
}
