import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
// import { catchError } from 'rxjs/operators';

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(localStorage.getItem('access_token')){
      request = request.clone({
        setHeaders: {
          'Content-Type' : 'application/json; charset=utf-8',
          'Accept'       : 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError ((error) => {
        if(error && error.status ===401){
          return this.handle401Error(request, next, error);
        } else {
          return throwError(() => error)
        }

      })
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler,
    originalError: any
  ) {
    /* return this.authService.refreshCookie().pipe(
      switchMap(() => {
        return next.handle(req);
      }),
      catchError((error) => { */
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');

        this.router.navigate(['/']);
        return throwError(() => originalError);
      /* })
    ); */
  }
}
