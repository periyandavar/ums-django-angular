import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../index';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  public constructor(private injector: Injector) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token = this.injector.get(LoginService).getToken();
    if (token === null) {
      return next.handle(request);
    }
    let tokenizedReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(tokenizedReq);
  }
  // public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   request = request.clone({
  //     withCredentials: true
  // });
  // return next.handle(request);
  // }
}
