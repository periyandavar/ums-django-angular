import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { ResponseData } from '../index';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private jwtHelper: JwtHelperService
  ) {}

  registerUser(user: any): Observable<ResponseData<any>> {
    return this.http.post<ResponseData<any>>(`${this.url}register`, user);
  }

  isValid(token: string) {
    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch (e) {
      return false;
    }
  }

  logout() {
    // localStorage.clear();
    this.cookieService.delete('token');
  }

  loginUser(data: any) {
    this.logout();
    return this.http.post<any>(`${this.url}login\\`, data);
  }

  loggedIn() {
    // return !!localStorage.getItem('token');
    return (
      this.cookieService.get('token') != '' &&
      this.isValid(this.cookieService.get('token'))
    );
  }

  getToken() {
    // return localStorage.getItem('token');
    return this.cookieService.get('token');
  }

  registerToken(token: string) {
    // localStorage.setItem('token', token);
    this.cookieService.set('token', token);
  }
}
