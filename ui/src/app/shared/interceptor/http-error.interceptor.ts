import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../index';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  public constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          console.log('error occured');
        } else if (error.status === 401 && this.loginService.loggedIn()) {
          console.log('Session expired. please, login again to continue..!');
          this.router.navigate(['/login']);
        } else if (error.status === 401) {
          alert('Invalid credentials..!');
          this.router.navigate(['/login']);
        } else if (error.status === 500) {
          console.log(error);
        }
        return EMPTY;
      })
    );
  }
}
