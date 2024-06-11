import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../index';
import { ResponseData, Pagination } from '../../../shared/index';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.baseUrl}employees`;

  public constructor(private http: HttpClient) {}

  public getUsers(
    page: number = 1,
    limit: number = 5
  ): Observable<Pagination<User>> {
    return this.http.get<Pagination<User>>(
      // `${this.url}?page=${page}&limit=${limit}`
      `${this.url}/?offset=${(page - 1) * limit}&limit=${limit}`
    );
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}/`);
  }

  public deleteUser(id: number): Observable<ResponseData<string>> {
    return this.http.delete<ResponseData<string>>(`${this.url}/${id}/`);
  }

  public updateUser(id: number, user: any): Observable<ResponseData<string>> {
    return this.http.put<ResponseData<string>>(`${this.url}/${id}/`, user);
  }

  public newUser(user: any): Observable<ResponseData<string>> {
    return this.http.post<ResponseData<string>>(`${this.url}/`, user);
  }
}
