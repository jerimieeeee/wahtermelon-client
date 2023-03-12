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
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
// import { catchError } from 'rxjs/operators';

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {
  cookie_value;

  constructor(
    private cookieService: CookieService,
    private toastr: ToastrService
  ) {
    this.cookie_value = this.cookieService.get('access_token');
  }


  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if(this.cookieService.get('access_token')){
      request = request.clone({
        setHeaders: {
          // 'Content-Type' : 'multipart/form-data',
          'Accept'       : 'application/json',
          'withCredentials': 'true',
          'Authorization': `Bearer ${this.cookie_value}`
        },
      });
    }
    return next.handle(request).pipe(
      catchError ((error) => {
        if(error && error.status === 401){
          return this.handle401Error(request, next, error);
        } else {
          /* this.toastr.error(error.error.message, 'Error', {
            closeButton: true,
            positionClass: 'toast-top-center',
            disableTimeOut: true
          }) */
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
        // localStorage.removeItem('user');
        // localStorage.removeItem('access_token');

        // this.router.navigate(['/']);
        localStorage.removeItem('user');
        this.cookieService.delete('access_token');
        return throwError(() => originalError);
      /* })
    ); */
  }
}
