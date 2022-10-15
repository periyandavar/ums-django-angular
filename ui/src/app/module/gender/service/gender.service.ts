import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Gender } from '../index';
import {
  ResponseData,
  DropdownOption,
  Pagination,
} from '../../../shared/index';

@Injectable({
  providedIn: 'root',
})
export class GenderService {
  private url = `${environment.baseUrl}genders`;

  public constructor(private http: HttpClient) {}

  public getGenders(
    page: number = 1,
    limit: number = 5
  ): Observable<Pagination<Gender>> {
    return this.http.get<Pagination<Gender>>(
      `${this.url}/?page=${page}&limit=${limit}`
    );
  }

  public getGender(id: number): Observable<Gender> {
    return this.http.get<Gender>(`${this.url}/${id}/`);
  }

  public updateGender(id: number, data: any): Observable<ResponseData<string>> {
    return this.http.put<ResponseData<string>>(`${this.url}/${id}/`, data);
  }

  public addGender(data: any) {
    return this.http.post<ResponseData<string>>(`${this.url}/`, data);
  }

  public changeStatus(
    id: number,
    status: boolean
  ): Observable<ResponseData<string>> {
    let data = {
      status: status,
    };
    // return this.http.post<ResponseData<string>>(
    //   `${this.url}/change-status/${id}/`,
    //   data
    // );
    return this.http.post<ResponseData<string>>(
      // `${this.url}/change-status/${id}/`,
      `${this.url}/${id}/change-status/`,
      // `${this.url}/${id}/`,
      data
    );
  }

  public activeData(): Observable<DropdownOption[]> {
    return this.http.get<DropdownOption[]>(`${this.url}/?limit=999999999999`);
  }
}
